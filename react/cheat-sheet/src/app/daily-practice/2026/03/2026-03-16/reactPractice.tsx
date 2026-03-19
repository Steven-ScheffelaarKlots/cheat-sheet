'use client'

import React, { useEffect, useState } from 'react';

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

interface sortOption {
    field: 'title' | 'body',
    reversed: boolean,
    id: number
}

const sortOptions: sortOption[] = [
    {
        field: "title",
        reversed: false,
        id: 0
    },
    {
        field: "title",
        reversed: true,
        id: 1
    },
    {
        field: "body",
        reversed: false,
        id: 2
    },
     {
        field: "body",
        reversed: true,
        id: 3
    },
]

const PostFiltering = () => {

    const [posts, setPosts] = useState<Post[]>([])
    const [filterText , setFilterText] = useState<string>("")
    const [sorting, setSorting] = useState<sortOption>(sortOptions[0])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(ENDPOINT)
            const result = await response.json()
            setPosts(result)
        }

        fetchPosts()
    }, [])

    const filterPosts = () => {
        let tempPosts = posts
        tempPosts = tempPosts.filter((post) => post.body.includes(filterText) ||  post.title.includes(filterText))
        tempPosts = tempPosts.sort((a, b) => {
            if(sorting.reversed) {
                return a[sorting.field].localeCompare(b[sorting.field])
            } else {
                return b[sorting.field].localeCompare(a[sorting.field])
            }
        })
        return tempPosts
    }


    return (
        <div>
            <div>
                <div>Post Filtering</div>
                <label>Filtertext:</label>
                <input value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                {sortOptions.map((option) => (
                    <button key={option.id} onClick={() =>setSorting(option)}>Field: {option.field} Reversed: {String(option.reversed)}</button>
                ))}

            </div>
            <div>
                <PostList posts={filterPosts()} />
            </div>
        </div>
    )
}

interface PostListProps {
    posts: Post[];
}

const PostList = ({posts}: PostListProps) => {
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <div>Title: {post.title}</div>
                    <div>Body: {post.body}</div>    
                </div>
            ))}
        </div>
    )
}


export default PostFiltering
