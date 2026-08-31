"use client";

import React, { useState, useEffect, useMemo } from "react";

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

type PostFields = "id" | "title" | "body";
type Direction = "asc" | "desc";

const PostFiltering = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [sortDirection, setSortDirection] = useState<Direction>("asc");
    const [sortField, setSortField] = useState<PostFields>("id");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await (await fetch(ENDPOINT)).json();
            setPosts(response);
        };
        fetchPosts();
    }, []);

    const filterPosts = useMemo(() => {
        const filteredPosts = posts.filter(
            (post) =>
                post.body.includes(searchText) ||
                post.title.includes(searchText),
        );
        const sortedPosts = filteredPosts.sort((a, b) => {
            const order = a[sortField] > b[sortField] ? 1 : -1;
            return sortDirection === "asc" ? order : -order;
        });
        return sortedPosts;
    }, [posts, searchText, sortDirection, sortField]);

    return (
        <div>
            <div>
                <h2>Post Filtering</h2>
                <div>
                    <label>
                        Search Text:
                        <input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </label>
                    <label>
                        Sort Direction
                        <select
                            onChange={(e) =>
                                setSortDirection(e.target.value as Direction)
                            }
                        >
                            <option value={"asc"}>Ascending</option>
                            <option value={"desc"}>Descending</option>
                        </select>
                    </label>
                    <label>
                        Sort by:
                        <select
                            onChange={(e) =>
                                setSortField(e.target.value as PostFields)
                            }
                        >
                            <option value={"id"}>ID</option>
                            <option value={"title"}>Title</option>
                            <option value={"body"}>Body</option>
                        </select>
                    </label>
                </div>
            </div>
            <div>
                <PostDisplay posts={filterPosts} />
            </div>
        </div>
    );
};

interface PostDisplayProps {
    posts: Post[];
}

const PostDisplay = ({ posts }: PostDisplayProps) => {
    return (
        <>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <div>ID: {post.id}</div>
                    <div>Title: {post.title}</div>
                    <div>Body: {post.body}</div>
                </div>
            ))}
        </>
    );
};

export default PostFiltering;
