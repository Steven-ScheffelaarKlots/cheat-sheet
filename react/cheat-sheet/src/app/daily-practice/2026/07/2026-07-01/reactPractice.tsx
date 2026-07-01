'use client'

import React, {useState, useEffect} from 'react';

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

const PostFiltering = () => {

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(ENDPOINT)
            const result = await response.json()
            setPosts(result)
        }
        fetchPosts()
    }, [])


    return (
        <div>
            <div>
                <h2>Posts</h2>
                <div>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <div>{post.title}</div>
                            <div>{post.body}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default PostFiltering
