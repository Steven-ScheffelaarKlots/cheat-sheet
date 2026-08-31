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

type PostFields = 'id' | 'body'| 'title'
type Directions = 'asc' | 'desc'

const PostFiltering = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [searchText, setSearchText] = useState<string>("")
    const [sortDirection, setSortDirection] = useState<Directions>('asc')
    const [postField, setPostField] = useState<PostFields>('id')

    useEffect(() => {
        const fetchPosts = async () => {
            const tempPosts = await fetch(ENDPOINT)
            const result = await tempPosts.json()
            setPosts(result)
        }

        fetchPosts()
    }, [])

    const filterPosts = () => {
        const filteredPosts = posts.filter(post => post.body.includes(searchText) || post.title.includes(searchText))
        const sortedPosts = filteredPosts.sort((a ,b) => {
            const order = a[postField] > b[postField] ? 1 : -1
            return sortDirection === 'asc' ? order : -order
        })

        return sortedPosts
    }

    return (
        <div>
            <h1>Posts</h1>
            <div>
                <label>Search Text: 
                    <input onChange={(e) => setSearchText(e.target.value)} />
                </label>
                <label>
                    Field:
                    <select onChange={e => setPostField(e.target.value as PostFields)}>
                        <option value="id">id</option>
                        <option value="body">Body</option>
                        <option value="title">Title</option>
                    </select>
                </label>
                <label>
                    Direction
                    <select onChange={e => setSortDirection(e.target.value as Directions)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
                
            </div>
            <PostDisplay posts={filterPosts()}/>
        </div>
    )
}

interface PostDisplayProps {
    posts: Post[]
}

const PostDisplay = ({posts} : PostDisplayProps) => {
    console.log(posts)
    return (
        <>
            Posts
            {posts.map( post => (
                <div key={post.id}>
                    <div>
                        Id: {post.id}
                    </div>
                    <div>
                        Title: {post.title}
                    </div>
                    <div>
                        Body: {post.body}
                    </div>
                </div>
            ))}
        </>
    )
}

export default PostFiltering
