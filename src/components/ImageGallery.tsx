import React, { useEffect, useState } from 'react';
import styles from "./ImageGallery.module.css";
import config from '../config/config';

interface ImageGalleryProps {
  refresh: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ refresh }) => {
    const [images, setImages] = useState<{ url: string; title: string }[]>([]); 
    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await fetch(config.API_IMAGE, { method: "GET" });
          const result = await response.json();
          setImages(result.data);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
  
      fetchImages();
    }, [refresh]);

    const closePopup = () => {
      setSelectedImage(null);
    };

    return (
    <div className={`
        ${styles.imageGallery}
        ${images.length === 0 ? styles.emptyGallery : ''}
      `}>
        <div className={styles.galleryGrid}>
          {images.map((image, index) => (
            <div key={index} className={styles.galleryItem} onClick={() => setSelectedImage(image)}>
              <img src={image.url} className={styles.galleryImage} />
              <p className={styles.imageTitle}>{image.title}</p>
            </div>
          ))}
        </div>    

        {selectedImage && (
        <div className={styles.popup} onClick={closePopup}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closePopup}>&times;</button>
            <img src={selectedImage.url} className={styles.popupImage} alt={selectedImage.title} />
            <p className={styles.popupTitle}>{selectedImage.title}</p>
          </div>
        </div>
        )}
    </div>
  );
};

export default ImageGallery;
