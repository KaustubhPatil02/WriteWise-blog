import { onAuthStateChanged } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../Firebase/firebase';
import Loading from '../components/loading/Loading';
import { collection, onSnapshot, query } from 'firebase/firestore';
// import { set } from 'firebase/database';
import UseFetch from '../components/hooks/UseFetch';
const BlogContext = createContext();

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
  const [currUser, setCurrUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userLoading, setUserLoading] = useState(true);

  const [allUsers, setAllUsers] = useState([]);
  const [publish, setPublish] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getUsers = () => {
      const postRef = query(collection(db, 'users'));
      onSnapshot(postRef, (snapshot) => {
        setAllUsers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setUserLoading(false);
      });
    };
    getUsers();

  }, [])
  // console.log(allUsers)
// new
 useEffect(() => {
  setLoading(true);
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrUser(user)
    } else {
      setCurrUser(null)
    }
    setLoading(false);
  });
  // Clean up the subscription on unmount
  return () => unsubscribe();
}, []); // Removed currUser from the dependency array
// old
// useEffect(() => {
//   setLoading(true);
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setCurrUser(user)
//     } else {
//       setCurrUser(null)
//     }
//     setLoading(false);
//   });
//   return () => unsubscribe();
// }, [currUser]);

const [updateData, setUpdateData] = useState({});


  const { data: postData, loading: postLoading } = UseFetch("writewise-posts");

  return (
    <BlogContext.Provider value={{ 
      currUser, 
      setCurrUser, 
      allUsers, 
      userLoading, 
      publish, 
      setPublish,
      title,
      setTitle,
      postData,
      postLoading,
      updateData,
      setUpdateData,

     }}>
      {loading ? <Loading /> : children}
      {/* {children } */}
    </BlogContext.Provider>
  );
};



export default Context
export const Blog = () => useContext(BlogContext);