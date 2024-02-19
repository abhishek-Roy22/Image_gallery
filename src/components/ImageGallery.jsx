import React from 'react';
import useFirestore from '../hook/useFirestore';

const ImageGallery = () => {
  const { docs, isLoading } = useFirestore('images');

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-4 mt-10 mb-10">
      {docs &&
        docs.map((doc) => (
          <div
            key={doc.id}
            className="card card-compact w-full bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={doc.imageUrl}
                alt="Shoes"
                className="w-full h-[350px] object-fill"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Uploaded by: {doc.userEmail}</h2>
              <p>Created on: {doc.createdAt.toDate().toLocaleDateString()}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ImageGallery;
