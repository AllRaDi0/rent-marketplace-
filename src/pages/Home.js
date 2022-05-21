import React, { useEffect, useState, useCallback } from "react";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  });
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost, postsCollectionRef]);

  return (
    <div>
      {postList.map((post) => {
        return (
          <div key={post.id}>
            <div>{post.title}</div>
            <div>{post.description}</div>
            <div>{post.author.name}</div>
            <div>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  {" "}
                  &#128465;
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
