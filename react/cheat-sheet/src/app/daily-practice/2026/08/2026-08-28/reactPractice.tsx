"use client";

import React, { useState, useEffect } from "react";

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

interface PostDisplayProps {
    posts: Post[];
}

const PostFiltering = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filterText, setFilterText] = useState<string>("");
    const [sortField, setSortField] = useState<"title" | "body" | "id">(
        "title",
    );
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(ENDPOINT);
            const result = await response.json();
            setPosts(result);
        };

        fetchPosts();
    }, []);

    const filterPosts = () => {
        const filteredPosts = posts.filter(
            (post) =>
                post.body.includes(filterText) ||
                post.title.includes(filterText),
        );
        const sortedPosts = filteredPosts.sort((a, b) => {
            const order = a[sortField] > b[sortField] ? 1 : -1;
            return sortDirection === "asc" ? order : -order;
        });

        return sortedPosts;
    };

    return (
        <div>
            <h2>Post Filtering</h2>
            <label>
                Search Text:
                <input
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </label>
            <label>
                Sort Field:
                <select
                    value={sortField}
                    onChange={(e) =>
                        setSortField(e.target.value as "title" | "body" | "id")
                    }
                >
                    <option value="title">Title</option>
                    <option value="body">Body</option>
                    <option value="id">ID</option>
                </select>
                
            </label>
            <label>
                Sort Direction:
                <select
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value as "asc" | "desc")}
                    >
                        <option value={"asc"}>Ascending</option>
                        <option value={"desc"}>Descending</option>
                    </select>
            </label>
            <PostDisplay posts={filterPosts()} />
        </div>
    );
};

const PostDisplay = ({ posts }: PostDisplayProps) => {
    return (
        <>
            {posts.map((post) => (
                <div key={post.id}>
                    <div>Title: {post.title}</div>
                    <div>Body: {post.body}</div>
                </div>
            ))}
        </>
    );
};

export default PostFiltering;
