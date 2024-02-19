import React, { useState } from 'react';
import useStorage from '../hook/useStorage';

const UploadForm = () => {
  const [selectFile, setSetselectFile] = useState(null);
  const { startUpload, progress } = useStorage();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSetselectFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectFile) {
      // start upload image
      startUpload(selectFile);
      setSetselectFile(null);
    }
  };

  return (
    <div className="text-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-8"
      >
        <input
          onChange={handleFileChange}
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button
          className={`btn gap-3 ${Boolean(progress) && 'loading'}`}
          disabled={!selectFile}
        >
          Upload 🚀
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
