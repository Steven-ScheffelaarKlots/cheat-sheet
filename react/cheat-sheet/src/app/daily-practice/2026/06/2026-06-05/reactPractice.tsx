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

const fields = ['id', 'title', 'body'] as const
type FieldType = typeof fields[number]

const PostFiltering = () => {

    const [posts, setPosts] = useState<Post[]>([])
    const [filterText, setFilterText] = useState<string>("")
    const [isReversed, setIsreversed] = useState<boolean>(false)
    const [activeField, setActiveField] = useState<FieldType>(fields[0])

    const setFilteredPosts = () => {
        let filteredPosts = posts

        filteredPosts = filteredPosts.filter((post) => post.body.includes(filterText) || post.title.includes(filterText))
        filteredPosts.sort((a,b) => {
            let comparison = 0
            switch (typeof a[activeField]) {
                case 'string':
                    comparison = (a[activeField] as string).localeCompare(b[activeField] as string)
                    break
                case 'number':
                    comparison = (a[activeField] as number) - (b[activeField] as number)
                    break
                default:
                    throw new Error(`Unsupported field type: ${typeof activeField}`)
            }
            return isReversed ? -comparison : comparison
        })
        return filteredPosts
    }

    useEffect( () => {
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
                <div>Set Filtering</div>
                <div>
                    <div>Search text</div>
                    <input value={filterText} onChange={(e) => setFilterText(e.target.value)}></input>
                    <div>Sorting</div>
                    {fields.map((field, index) => 
                        <div key={index}>
                            <button onClick={() => setActiveField(field)}>{field}</button>
                        </div>
                    )}
                    <div>Reversed</div>
                    <button onClick={() => setIsreversed(!isReversed)}>{ isReversed ? "Yes" : "No"}</button>
                </div>
            </div>
            <div>
                <div>Posts</div>
                <PostsDisplay posts={setFilteredPosts()}/>
            </div>
        </div>
    )
}

interface PostsDisplayProps {
    posts: Post[]
}
const PostsDisplay = ({posts}: PostsDisplayProps) => {
    return (
        <div>
            {posts.map(post => 
            <div key={post.id}>
                <div>title: {post.title}</div>
                <div>body: {post.body}</div>
            </div>
            )}
        </div>
    )
}


export default PostFiltering
