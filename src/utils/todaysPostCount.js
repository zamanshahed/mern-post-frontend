export function countTodayPosts(posts) {
  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

  return posts.filter((post) => {
    const postDate = new Date(post.postDate).toISOString().split("T")[0];
    return postDate === todayDateString;
  }).length;
}
