import { addDoc, collection } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from './firebase'
import "./newPost.scss"
import Button from './Button'

function NewPost() {
  const [title, setTitle] = useState("")
  const [post, setPost] = useState("")
  const [altText, setAltText] = useState("")
  const [urlForImage, setUrlForImage] = useState("")
  const navigate = useNavigate()
  const [user] = useAuthState(auth);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const fullPost = {
      title,
      post,
      date: new Date().toDateString(),
      urlForImage,
      altText,
    };
    try {
      await addDoc(collection(db, 'posts'), fullPost)
    } catch (err) {
      console.error(err)
    }
    setTitle("")
    setPost("")
    navigate("/")
  }

  if(user?.email !== 'joedvice@gmail.com') return <h3 className="form__emptyState">You don't have access to this feature. Please return to the main blog.</h3>

  return (
    <div className="form">
      <div className="form__sectionContainer">
        <form onSubmit={handleSubmit} >
          <label className="form__label" >
            Title:
            <input className="form__input" value={title} onChange={(event) => setTitle(event.target.value)}></input>
          </label>

          <label className="form__label">
            Text:
            <textarea className="form__input" value={post} rows={10} onChange={(event) => setPost(event.target.value)}></textarea>
          </label>

          <label className="form__label" >
            Alt text for image:
            <input className="form__input" value={altText} onChange={(event) => setAltText(event.target.value)}></input>
          </label>

          <label className="form__label" >
            URL for image:
            <input className="form__input" value={urlForImage} onChange={(event) => setUrlForImage(event.target.value)}></input>
          </label>

          <div className="form__buttonContainer">
            <Button type="submit" title="Add post" size="sm" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPost