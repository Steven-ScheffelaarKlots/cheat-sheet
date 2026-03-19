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
    field: "title" | "body";
    reversed: boolean,
    id: number
}

const sortFields: Sorting[] = [
    {
        field: "title",
        reversed: false,
        id: 1
    },
        {
        field: "title",
        reversed: true,
        id: 2
    },
        {
        field: "body",
        reversed: false,
        id: 3
    },
        {
        field: "body",
        reversed: true,
        id: 4
    },
]

const PostFiltering = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterText, setFilterText] = useState<string>("")
  const [sorting, setSorting] = useState<Sorting>(sortFields[0])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(ENDPOINT);
      const result = await response.json();
      setPosts(result);
    };
    fetchPosts();
  }, []);

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value)
  }

  const handleSortingChange = (sortingInput: Sorting) => {
    setSorting(sortingInput)
  }

  const setFiltering = () => {
    let tempPosts = posts
    tempPosts =  posts.filter((post) => post.body.includes(filterText) || post.title.includes(filterText))
    tempPosts.sort((a, b) => {
      if(sorting.reversed) {
        return a[sorting.field].localeCompare(b[sorting.field])
      } else {
        return b[sorting.field].localeCompare(a[sorting.field])
      }})


    return tempPosts
  }

  return (
    <div>
        <div>
            <div>Posts Filtering</div>
            <label>Filter text</label>
            <input onChange={(e) => handleFilterInput(e)} value={filterText} />
            <div>
                {sortFields.map((field) => (
                    <button key={field.id} onClick={() =>handleSortingChange(field)}>Field: {field.field} Reversed: {String(field.reversed)}</button>
                ))}
            </div>
        </div>
        <div>
            <PostsList posts={setFiltering()}/>
        </div>
    </div>);
};

interface PostsListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostsListProps) => {
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
