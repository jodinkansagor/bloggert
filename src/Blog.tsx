import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs } from "firebase/firestore";
import useStore, { FullPost } from "./common/store";
import "./blog.scss"
import { Link } from "react-router-dom";
import { useCallback } from "react";

function Blog() {
  const [user, loading] = useAuthState(auth);

  const setPosts = useStore((state) => state.setPosts)
  const posts = useStore((state) => state.posts)

  const fetchPosts = useCallback(async() => {
    try {
      const q = query(collection(db, "posts"))
      const doc = await getDocs(q);
      const arrayOfDocs = doc.docs.map((element) => {
        const elementData = { ...element.data(), id: element.id }
        return elementData
      })
      setPosts(arrayOfDocs.reverse() as FullPost[])
    } catch (err) {
      console.error(err)
    }
  },[setPosts])

  useEffect(() => {
    fetchPosts()
  },[fetchPosts])

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);


  return (
    <div className="blog">
      <div className="blog__innerContainer">
        <ul className="blog__list">
          {posts && posts.map((post, index) => {
            return (
              <li className="blog__listItem" key={index}>
                <img className="blog__listItem-image" src={post.urlForImage} alt={post.altText} id="myImg" />
                <h4>{post.title}</h4>
                <p>{post.date}</p>
                <Link to={`/:${post.id}`} className="blog__listItem-link" state={{ id: post.id }}>Read full post</Link>
              </li>
            )
          })}
        </ul>
        {user &&
         <div className="blog__loggedIn">
          Logged in as
          <div>{user.displayName}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
        }
      </div>
    </div>
  );
}
export default Blog;