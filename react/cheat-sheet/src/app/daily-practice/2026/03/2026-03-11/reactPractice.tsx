"use client";

import React, { useEffect, useState } from "react";

//Endpoint with post data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Sorting {
  field: "id" | "title" | "body";
  reversed: boolean;
  id?: number;
}

const sortingOptions: Sorting[] = [
  { id: 1, field: "id", reversed: false },
  { id: 2, field: "id", reversed: true },
  { id: 3, field: "title", reversed: false },
  { id: 4, field: "title", reversed: true },
  { id: 5, field: "body", reversed: false },
  { id: 6, field: "body", reversed: true },
];

const PostFiltering = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtering, setFiltering] = useState<string>("");
  const [sorting, setSorting] = useState<Sorting>({
    field: "id",
    reversed: false,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(ENDPOINT);
      const result = await response.json();
      setPosts(result);
    };
    fetchPosts();
  }, []);

  const handleFilteringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltering(e.target.value);
  };

  const filterPosts = () => {
    let tempPosts = posts.filter(
      (post) => post.body.includes(filtering) || post.title.includes(filtering),
    );

    tempPosts = tempPosts.sort((a, b) => {
      if (!sorting.reversed) {
        if (a[sorting.field] > b[sorting.field]) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a[sorting.field] < b[sorting.field]) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    return tempPosts;
  };

  const handleSortingChange = (field: Sorting) => {
    setSorting(field);
  };

  return (
    <div>
      <div>
        <div>Posts filtering</div>
        <label>Filtering</label>
        <input onChange={(e) => handleFilteringChange(e)} value={filtering} />
        <div>
          <div>Sorting</div>
          {sortingOptions.map((option) => (
            <div key={option.id}>
              <button onClick={() => handleSortingChange(option)}>
                Field: {option.field} reversed: {String(option.reversed)}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>Posts</div>
        <div>
          <PostsDisplay posts={filterPosts()} />
        </div>
      </div>
    </div>
  );
};

interface PostsDisplayProps {
  posts: Post[];
}

const PostsDisplay = ({ posts }: PostsDisplayProps) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div>Title: {post.title}</div>
          <div>Body: {post.body}</div>
        </div>
      ))}
    </div>
  );
};

export default PostFiltering;
