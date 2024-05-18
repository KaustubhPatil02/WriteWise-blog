import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase';

const UseFetch = (collectionName) => {
const [data, setData] = useState("");
const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const getUsers =()=>{
          const postRef= query(collection(db, collectionName));
          onSnapshot(postRef, (snapshot) =>{
            setData(
              snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }))
            );
            setLoading(false);
          });
        };
        getUsers();
        
      },[])
  return {data, loading}
}

export default UseFetch