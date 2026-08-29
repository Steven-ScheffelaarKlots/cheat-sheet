'use client'

import React, { useState, useEffect } from 'react';

//Endpoint with post data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENDPOINT = "https://jsonplaceholder.typicode.com/posts"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type SortFields = 'id' | 'title' | 'body'
type Direction = 'asc' | 'desc'

const PostFiltering = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [filterText, setFilterText] = useState<string>("")
    const [sortField, setSortField] = useState<SortFields>('id')
    const [sortDirection, setSortDirection] = useState<Direction>('desc')
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(ENDPOINT)
            const result = await response.json()
            setPosts(result)
        }

        fetchPosts()
    }, [])

    const filterPosts = () => {
        const filteredPosts = posts.filter((post) => post.body.includes(filterText) || post.title.includes(filterText))
        const sortedPosts = filteredPosts.sort((a, b) => {
            const order = a[sortField] > b[sortField] ? 1 : -1;
            return sortDirection === "asc" ? order : -order;
        });

        return sortedPosts
    }


    return (
        <div>
            <div>
                <h2>Post filtering</h2>
                <label>
                    Filter Text:
                    <input onChange={(e) => setFilterText(e.target.value)} />
                </label>
                <label>Field
                    <select onChange={(e) => setSortField(e.target.value as SortFields)} >
                        <option value="id">ID</option>
                        <option value="title">Title</option>
                        <option value="body">Body</option>
                    </select>
                </label>
                <label>
                    Direction:
                    <select onChange={(e) => setSortDirection(e.target.value as Direction)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <PostDisplay posts={filterPosts()} />
        </div>
    )
}

interface PostDisplayProps {
    posts: Post[]
}

const PostDisplay = ({posts}: PostDisplayProps) => {
    return (
        <>
            <h2>Post Display</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <div>Title: {post.title}</div>
                    <div>Body: {post.body}</div>
                </div>
            )
            )}
        </>
    )
}


export default PostFiltering
