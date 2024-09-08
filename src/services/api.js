const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const fetchUserPosts = async (userId) => {
  const response = await fetch(`${API_URL}/posts?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
