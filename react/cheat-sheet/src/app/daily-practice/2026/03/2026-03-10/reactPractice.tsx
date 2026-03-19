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

interface PostsDisplayProps {
    posts: Post[];
}

const PostFiltering = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [filterText, setFilterText] = useState<string>("")
    const filteredPosts = posts.filter((post) => post.body.includes(filterText) || post.title.includes(filterText))

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(ENDPOINT)
            const result = await response.json()
            setPosts(result)
        }
        fetchPosts()

    }, [])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value)
    }

    return (
        <div>
            <div>
                <div>Post filtering practice</div>
                <label>Filtering text</label>
                <input value={filterText} onChange={(e) => handleFilterChange(e)} />
            </div>
            <div>
                <PostsDisplay posts = {filteredPosts} />
            </div>
        </div>
    )
}

const PostsDisplay = ({posts} : PostsDisplayProps) => {

    return (
        <div>
            <div>
                {posts.length === 0 && <div>There are no posts</div>}
                {posts.map( post => (
                    <div key={post.id}>
                        <div>Title: {post.title}</div>
                        <div>Body: {post.body}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default PostFiltering