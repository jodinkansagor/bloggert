import React, { useCallback, useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { collection, where, query, getDocs, documentId, DocumentData } from "firebase/firestore";
import { db } from "./firebase";
import loadingGif from "./assets/loadingGif.gif"

import "./blogPost.scss"

function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState<DocumentData | undefined>(undefined)
  const formattedId = id.split(":")[1]

  const fetchPost = useCallback(async () => {
    try {
      const q = query(collection(db, 'posts'), where(documentId(), "==", formattedId))
      const doc = await getDocs(q)
      const formattedPost = doc.docs[0].data()
      setPost(formattedPost)
    } catch (err) {
      console.error(err)
    }
  }, [formattedId])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])


  const formatPost = (post) => {
    const arrayOfParagraphs: string[] = post?.split('/n')
    return arrayOfParagraphs.map(paragraph => (
      <>
        <p className="blogPost__postCopy">{paragraph}</p>
        <br />
      </>
    ))
  }


  if (!post) {
    return (
      <div className="blogPost__loadingContainer">
        <img className="blogPost-loading" src={loadingGif} alt="loading spinner" />
      </div>
    )
  } else {
    return (
      <div className="blogPost">
        <div className="blogPost__middle">
          <div className="blogPost__inner">
            {post?.urlForImage && <img className="blogPost__image" src={post.urlForImage} alt={post.altText} id="myImg" />}
            <h4>{post.title}</h4>
            <p>{post.date}</p>
            <p>{formatPost(post?.post)}</p>
            <Link className="blogPost__linkToHome" to="/">Back to post list.</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPost