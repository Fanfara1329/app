export const getComments = (postId) => {
  return () => {
    return fetch(`http://localhost:5000/comments?postId=${postId}`).then((e) =>
      e.json()
    );
  };
};

export const createComment = (postId) => {
  return (text) => {
    return fetch(`http://localhost:5000/comments?postId=${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: text,
        postId,
      }),
    }).then((e) => e.json());
  };
};
