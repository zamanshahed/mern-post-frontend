import React, { useState, useRef, useEffect } from "react";

/**
 * ImageUploader
 * Props:
 *  - apiKey: string (ImgBB API key) OR undefined if you will use serverProxy
 *  - serverProxy: string (optional) - URL of your server endpoint that forwards to ImgBB (recommended for prod)
 *  - maxSizeMB: number (optional, default 32)
 *  - onComplete: fn(response) optional callback when upload succeeds
 *  - onRemove: fn() optional callback when image removed from preview
 */
export default function ImageUploader({
  apiKey = import.meta.env.VITE_IMG_BB_API_KEY,
  serverProxy,
  maxSizeMB = 32,
  onComplete,
  onRemove,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    // Clean up object URL
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function reset() {
    setFile(null);
    setPreviewUrl(null);
    setUploading(false);
    setProgress(0);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = null;
  }

  function handleFileChosen(chosen) {
    setError(null);
    if (!chosen) return;

    // Basic validation
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/avif",
      "image/heic",
      "image/bmp",
    ];
    if (!allowedTypes.includes(chosen.type)) {
      setError("Unsupported file type. Use JPG/PNG/GIF/WEBP/AVIF/HEIC/BMP.");
      return;
    }
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (chosen.size > maxBytes) {
      setError(`File too large. Max ${maxSizeMB} MB.`);
      return;
    }

    setFile(chosen);
    setPreviewUrl(URL.createObjectURL(chosen));
    setResult(null);
  }

  function handleInputChange(e) {
    const f = e.target.files && e.target.files[0];
    handleFileChosen(f);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    handleFileChosen(f);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Upload using XMLHttpRequest so we can show upload progress
  function uploadToImgbb(fileToUpload) {
    return new Promise((resolve, reject) => {
      if (!fileToUpload) return reject(new Error("No file provided"));
      // If serverProxy provided, POST to it and let it handle the ImgBB key.
      if (serverProxy) {
        const form = new FormData();
        form.append("image", fileToUpload);
        // Optionally send filename
        form.append("name", fileToUpload.name);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", serverProxy, true);
        xhr.upload.onprogress = (evt) => {
          if (evt.lengthComputable) {
            const p = Math.round((evt.loaded / evt.total) * 100);
            setProgress(p);
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const json = JSON.parse(xhr.responseText);
              resolve(json);
            } catch (err) {
              reject(new Error("Invalid JSON from server proxy"));
            }
          } else {
            reject(
              new Error(`Proxy upload failed: ${xhr.status} ${xhr.statusText}`)
            );
          }
        };
        xhr.onerror = () =>
          reject(new Error("Network error during proxy upload"));
        xhr.send(form);
        return;
      }

      // Otherwise use ImgBB directly (key must be provided)
      if (!apiKey) {
        return reject(
          new Error("No apiKey supplied and no serverProxy configured")
        );
      }

      const url = `https://api.imgbb.com/1/upload?key=${encodeURIComponent(
        apiKey
      )}`;
      const form = new FormData();

      // To use multipart/form-data we append the file directly; ImgBB accepts file in 'image'
      form.append("image", fileToUpload);
      form.append("name", fileToUpload.name);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);

      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable) {
          const p = Math.round((evt.loaded / evt.total) * 100);
          setProgress(p);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText);
            if (!json.success) {
              reject(new Error("ImgBB responded with success=false"));
            } else {
              resolve(json);
            }
          } catch (err) {
            reject(new Error("Invalid JSON from ImgBB"));
          }
        } else {
          // try to parse error body
          let msg = `ImgBB upload failed: ${xhr.status} ${xhr.statusText}`;
          try {
            const body = JSON.parse(xhr.responseText);
            msg += " — " + (body?.error?.message || JSON.stringify(body));
          } catch {}
          reject(new Error(msg));
        }
      };

      xhr.onerror = () =>
        reject(new Error("Network error during ImgBB upload"));
      xhr.send(form);
    });
  }

  async function handleUploadClick() {
    setError(null);
    setResult(null);
    if (!file) {
      setError("Pick a file first.");
      return;
    }
    try {
      setUploading(true);
      setProgress(0);
      const resp = await uploadToImgbb(file);
      setResult(resp);
      if (typeof onComplete === "function") onComplete(resp);
    } catch (err) {
      console.error(err);
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div
        className="border-dashed border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Click or drag & drop an image here
          </p>
          <p className="text-xs text-gray-400">
            Max {maxSizeMB} MB — JPG/PNG/GIF/WEBP/AVIF/HEIC/BMP
          </p>
        </div>

        {previewUrl ? (
          <div className="mt-4 w-full flex gap-4 items-center">
            <img
              src={previewUrl}
              alt="preview"
              className="w-24 h-24 object-cover rounded-md border"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">{file?.name}</div>
                  <div className="text-xs text-gray-500">
                    {(file?.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm text-red-500 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                    onRemove();
                  }}
                >
                  Remove
                </button>
              </div>

              {!result && (
                <div className="mt-2">
                  <button
                    className={`px-4 py-2 rounded-md text-white ${
                      uploading
                        ? "bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!uploading) handleUploadClick();
                    }}
                    disabled={uploading}
                  >
                    {uploading ? `Uploading (${progress}%)` : "Upload"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="text-xs text-gray-500">No file chosen</div>
          </div>
        )}

        {uploading && (
          <div className="w-full mt-4 bg-gray-100 rounded">
            <div
              className="h-2 rounded"
              style={{ width: `${progress}%`, backgroundColor: "#2563eb" }}
            />
          </div>
        )}

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>
    </div>
  );
}
