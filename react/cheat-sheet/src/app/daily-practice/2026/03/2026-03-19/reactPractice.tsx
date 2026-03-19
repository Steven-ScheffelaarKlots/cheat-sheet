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

interface sortingItem {
    field: 'title' | 'body';
    reversed: boolean;
    id: number;
}

const sortingItems: sortingItem[] = [
    {
        field: 'title',
        reversed: false,
        id: 0
    },
        {
        field: 'title',
        reversed: true,
        id: 1
    },
        {
        field: 'body',
        reversed: false,
        id: 3
    },
        {
        field: 'body',
        reversed: true,
        id: 4
    },
]

const PostFiltering = () => {

    const [posts, setPosts] = useState<Post[]>([])
    const [filterText, setFilterText] = useState<string>("")
    const [sorting, setSorting] = useState<sortingItem>(sortingItems[0])

    useEffect(()=> {
        const fetchPosts = async () => {
            const response = await fetch(ENDPOINT)
            const result = await response.json()
            setPosts(result)
        }
        fetchPosts()
    }, [])

    const filterPosts = () => {
        let tempPosts = posts
        tempPosts = tempPosts.filter(post => post.body.includes(filterText) || post.title.includes(filterText))
        tempPosts.sort((a,b) => {
            if(sorting.reversed) {
                return b[sorting.field].localeCompare(a[sorting.field])
            } else {
                return a[sorting.field].localeCompare(b[sorting.field])
            }
        })
        return tempPosts
    }


    return (
        <div>
            <div>
                <div>Post filtering</div>
                <div>
                    <label>Filtering text</label>
                    <input value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                </div>
                <div>
                    <div>Sorting</div>
                    {sortingItems.map(item => (
                        <button key={item.id} onClick={() => setSorting(item)}>Field: {item.field} reversed: {String(item.reversed)}</button>
                    ))}
                </div>
            </div>
            <div>
                <div>Posts Display</div>
                <PostsDisplay posts={filterPosts()} />
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
            {posts.map((post) => (
                <div key={post.id} >
                    <div>Title: {post.title}</div>
                    <div>BodyL {post.body}</div>
                </div>
            ))}
        </div>
    )
}


export default PostFiltering
