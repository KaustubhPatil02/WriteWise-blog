import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/firebase';

const useSingleFetch = (collectionName, id, subCol) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSingleData = () => {
      if (collectionName) { // Check if collectionName is defined
        const postRef = query(collection(db, collectionName, id, subCol));
        onSnapshot(postRef, (snapshot) => {
          setData(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
          setLoading(false);
        });
      }
    };

    getSingleData();
  }, [collectionName, id, subCol]);

  return { data, loading };
};

export default useSingleFetch;

