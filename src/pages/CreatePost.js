import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const postsCollectionRef = collection(db, "posts");
  const storageRef = ref(storage, `files/1W`);
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      description,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });

  return (
    <div>
      <div>
        <h1>CreatePost</h1>
        <div>
          <label>Title:</label>
          <input
            placeholder="Enter the title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            placeholder="Enter the description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}>Submit post</button>
      </div>
    </div>
  );
}

export default CreatePost;
