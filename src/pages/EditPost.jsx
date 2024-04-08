import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Ccontainer, PostForm } from '../components'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
  
    useEffect(() => {
      if (slug) {
        appwriteService.getPost(slug).then((post) => {
          if (post) {
            setPost(post)
          }else {
            navigate("/")
          }
        })
      }
    }, [slug, navigate])

  return (
    <div className='py-6'>
      <Ccontainer>
        <PostForm post={post} />
      </Ccontainer>
    </div>
  )
}

export default EditPost
