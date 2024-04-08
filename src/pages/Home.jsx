import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Ccontainer, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
  if (posts.length === 0) {
    return (
      <div className='w-full py-8'>
      <Ccontainer>
        <div className="flex flex-wrap">
          <h1>Login to read posts</h1>
        </div>
      </Ccontainer>
    </div>
    )
  }


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

export default Home
