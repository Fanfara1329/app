export const getPosts = () => {
  return fetch("http://localhost:5000/posts").then((e) => e.json());
};

export const createPost = ({ title, author }) => {
  return fetch(`http://localhost:5000/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      author,
    }),
  }).then((e) => e.json());
};
