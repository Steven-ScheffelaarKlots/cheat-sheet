'use client'

import React, { useEffect, useState } from "react";


const ENDPOINT = "https://jsonplaceholder.typicode.com/posts"

interface Post {
  userID: number;
  id: number;
  title: string;
  body: string;
}

const FetchComponent: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT);
      setData(await response.json());
    };
    fetchData();
  }, []);

  const removePost = (id: number) => {
    setData(data.filter((post) => post.id !== id));
  };

  return (
    <div>
      <div>Fetch Data Component</div>
      <div>
        {data.map((post) => (
          <div key={post.id}>
            <div>{post.title}</div>
            <button onClick={() => removePost(post.id)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchComponent