import React from "react";

function PostList({ posts }) {
  return (
    <div className="post-list">
      <h2>Your Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
