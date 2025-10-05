/**
 * uploadToImgbb
 * - Works in the browser. Accepts File/Blob or a base64/dataURL string.
 * - WARNING: exposing API key in client code is insecure for production.
 *
 * @param {File|Blob|string} input - File/Blob or base64/dataURL string
 * @param {string} apiKey - ImgBB API key
 * @param {{ name?:string, expiration?:number }} [opts]
 * @returns {Promise<Object>} - returns parsed JSON response from ImgBB
 */
export async function uploadToImgbb(input, apiKey, opts = {}) {
  if (!apiKey) throw new Error("ImgBB API key is required.");

  const url = "https://api.imgbb.com/1/upload";

  const form = new FormData();
  // If input is a File/Blob, append as 'image' (multipart/form-data)
  if (
    input instanceof Blob ||
    (typeof File !== "undefined" && input instanceof File)
  ) {
    form.append("image", input);
  } else if (typeof input === "string") {
    // assume base64 or dataURL string
    // If it's a data URL (starts with "data:"), strip the prefix to only send the base64 part
    const dataUrlMatch = input.match(/^data:(.+);base64,(.*)$/);
    const base64 = dataUrlMatch ? dataUrlMatch[2] : input;
    form.append("image", base64);
  } else {
    throw new TypeError("input must be a File/Blob or base64/dataURL string");
  }

  if (opts.name) form.append("name", opts.name);
  if (opts.expiration) form.append("expiration", String(opts.expiration)); // seconds

  // Append key as query param (ImgBB examples do so) => simpler than adding to form
  const query = new URLSearchParams({ key: apiKey }).toString();
  const resp = await fetch(`${url}?${query}`, {
    method: "POST",
    body: form,
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(
      `ImgBB upload failed: ${resp.status} ${resp.statusText} ${text}`,
    );
  }

  const json = await resp.json();
  if (!json || !json.success)
    throw new Error(
      "ImgBB responded but upload not successful: " + JSON.stringify(json),
    );
  return json; // contains data.url, data.display_url, data.delete_url, etc.
}
