import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Ccontainer, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
    }, [])

  return (
    <div className='w-full py-8'>
      <Ccontainer>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Ccontainer>
    </div>
  )
}

export default AllPosts
