import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseCofig';

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, collectionName), orderBy('createdAt', 'desc')),
      (querySnapshot) => {
        const images = [];
        querySnapshot.forEach((doc) => {
          const { imageUrl, createdAt, userEmail } = doc.data();
          images.push({ imageUrl, createdAt, userEmail, id: doc.id });
        });
        setDocs(images);
        setIsLoading(false);
      },
      (error) => {
        console.error(error.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);
  return {
    docs,
    isLoading,
  };
};

export default useFirestore;
