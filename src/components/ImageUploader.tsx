import React, { useState } from 'react';
import styles from "./ImageUploader.module.css";
import config from '../config/config';

interface ImageUploaderProps {
  onUploadSuccess: () => void;
}

interface Image {
  file: File;
  preview: string;
  title: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [confirmationMessageType, setConfirmationMessageType] = useState<'error' | 'success' | ''>('success');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: Image[] = [];

      Array.from(files).forEach((file) => {
        const previewUrl = URL.createObjectURL(file);
        newImages.push({ file, preview: previewUrl, title: '' });
      });

      setImages(() => [...newImages]);
    }
  };

  const handleTitleChange = (index: number, title: string) => {
    const updatedImages = [...images];
    updatedImages[index].title = title;
    setImages(updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    const hasEmptyTitle = images.some((image) => !image.title.trim());   
    const hasWebPImage = images.some((image) => image.file.type === "image/webp" || image.file.name.toLowerCase().endsWith(".webp"));
    if (hasEmptyTitle || hasWebPImage) {
      if (hasEmptyTitle) {
        setConfirmationMessage("Error: Please enter a title for all images.");
        setConfirmationMessageType('error');
      } else {
        setConfirmationMessage("Error: WebP images are not allowed.");
        setConfirmationMessageType('error');
      }
      setTimeout(() => {
        setConfirmationMessage("");
        setConfirmationMessageType("");
      }, 3000);
      return;
    }

    if (images.length === 0) {
      setUploadStatus("No images selected.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading...");

    const formData = new FormData();

    images.forEach((image) => {
      console.log('Uploading image:', image.file.name);
      formData.append("images", image.file, image.file.name);
      formData.append("titles[]", image.title);
    });

    try {
        const response = await fetch(config.API_IMAGE, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          setUploadStatus("");
          setConfirmationMessage("Your images were uploaded successfully!");          
          onUploadSuccess();

          setTimeout(() => {
            setConfirmationMessage("");
          }, 3000);
        } else {
          setUploadStatus("Upload failed.");
          setConfirmationMessage("");
        }
      } catch (error) {
        setUploadStatus("Error during upload.");
        setConfirmationMessage(""); 
      }
  
      setIsUploading(false);

    setImages([]);
  };

  return (
    <div className={styles.imageUploaderContainer}>
      <h2>Mini Inspection Form</h2>

      <div className={styles.fileUploadContainer}>
        <label htmlFor="file-input" className={styles.fileUploadLabel}>
            <i className={styles.fileUploadIcon}>📁</i>
            <p className={styles.fileUploadText}>Click to upload images</p>
        </label>

        <input
            type="file"
            id="file-input"
            className={styles.fileInput}
            onChange={handleImageChange}
            accept="image/*"
            multiple
        />
      </div>

      {images.length > 0 && (
        <div className={styles.imagePreviewContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.imagePreviewCard}>
              <div className={styles.imagePreview}>
                <img
                  src={image.preview}
                  alt={`Image preview ${index}`}
                  className={styles.image}
                />
              </div>
              <div className={styles.titleContainer}>
                <input
                  type="text"
                  value={image.title}
                  placeholder="Enter title"
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                  className={styles.titleInput}
                />
              </div>
              <div className={styles.removeContainer}>
                <button
                  onClick={() => handleRemoveImage(index)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Menampilkan status upload */}
      <div className={styles.uploadStatus}>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>

      {/* Menampilkan pesan konfirmasi setelah upload */}
      {confirmationMessage && (
        <div className={`
          ${styles.confirmationMessage} 
          ${styles[confirmationMessageType === 'error' ? 'error' : 'success']}
          ${!confirmationMessage ? styles.hide : ''}
        `}>
          <p>{confirmationMessage}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={images.length === 0}
        className={styles.uploadBtn}
      >
         {isUploading ? "Uploading..." : "Upload All Images"}
      </button>
    </div>
  );
};

export default ImageUploader;
