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

// TODO: implement useFetch(url) -> { data, loading, error }

const HooksPractice = () => {
    const posts = useFetch(ENDPOINT);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <div>{post.title}</div>
                    <div>{post.body}</div>
                </div>
            ))}
        </div>
    );
};

const useFetch = (url: string) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(()=> {
    const fetchPosts = async () => {
        const response = await fetch(url);
        const result = await response.json();
        setPosts(result);
    };
    fetchPosts();
    }, [url])

    return posts;
};

export default HooksPractice;
