import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader'; 
import ImageGallery from '../components/ImageGallery'; 

const ImagePage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(prev => !prev); 
  };

  return (
    <div>
      <ImageUploader onUploadSuccess={triggerRefresh} /> {}
      <ImageGallery refresh={refresh} /> {}
    </div>
  );
};

export default ImagePage;
