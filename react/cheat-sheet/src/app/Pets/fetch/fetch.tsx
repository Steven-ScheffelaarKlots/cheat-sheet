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

  const [postData, setPostData] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts  = async () => {

        const response = await fetch(ENDPOINT)
        const result = await response.json()
        setPostData(result)

    }

    fetchPosts()


}, [])


  return (
    <div>
      <div>Fetch Data Component</div>
      <div>
        {postData.map((post) => (
          <div key={post.id}>
            <div>{post.userID}</div>
            <div>{post.title}</div>
            <div>{post.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchComponent