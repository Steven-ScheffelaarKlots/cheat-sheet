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

const fields = ["body", "title", "id"] as const;

type sortingTypes = {
    field: (typeof fields)[number];
    direction: boolean;
};

const PostFiltering = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filterText, setFilterText] = useState<string>("");
    const [sorting, setSorting] = useState<sortingTypes>({
        field: "id",
        direction: true,
    });

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(ENDPOINT);
            const result = await response.json();
            setPosts(result);
        };
        fetchPosts();
    }, []);

    const filterPosts = () => {
        let tempPosts = posts;
        tempPosts = tempPosts.filter(
            (post) =>
                post.body.includes(filterText) ||
                post.title.includes(filterText),
        );

        const direction = sorting.direction ? 1 : -1;
        tempPosts.sort((a, b) => {
            const valA = a[sorting.field];
            const valB = b[sorting.field];
            if (typeof valA === "string" && typeof valB === "string") {
                return valA.localeCompare(valB) * direction;
            } else if (typeof valA === "number" && typeof valB === "number") {
                return (valA - valB) * direction;
            } else {
                throw Error("Not a compatible comparison");
            }
        });
        return tempPosts;
    };
    return (
        <div>
            <div>
                <h4>Filtering</h4>
                <div>
                    Filter Text:{" "}
                    <input onChange={(e) => setFilterText(e.target.value)} />
                </div>
                <h4>Sorting</h4>
                <div>
                    <div>Field</div>
                    {fields.map((field, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setSorting({
                                    field: field,
                                    direction: sorting.direction,
                                })
                            }
                            style={
                                field === sorting.field
                                    ? {
                                          fontWeight: "bold",
                                          textDecoration: "underline",
                                      }
                                    : {}
                            }
                        >
                            {field}
                        </button>
                    ))}
                    <div>Direction</div>
                    <button
                        onClick={() =>
                            setSorting({
                                field: sorting.field,
                                direction: !sorting.direction,
                            })
                        }
                    >
                        {sorting.direction ? "Forward" : "Reverse"}
                    </button>
                </div>
            </div>
            <div>
                <PostsDisplay posts={filterPosts()} />
            </div>
        </div>
    );
};

type PostsDisplayProps = {
    posts: Post[];
};

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
