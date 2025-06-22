import React, { useState } from 'react';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async () => {
        if (isUploading) return; // Prevent duplicate calls
        setIsUploading(true);
        setIsLoading(true);
        try {
            // Assuming uploadImage is a function that uploads the image
            await uploadImage(image);
            // Handle successful upload (e.g., show a success message, update the UI, etc.)
        } catch (error) {
            // Handle error (e.g., show an error message)
        } finally {
            setIsLoading(false);
            setIsUploading(false);
        }
    };

    return (
        <div>
            {/* Assuming there's an input to select the image */}
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                disabled={isLoading}
            />
            <button onClick={handleImageUpload} disabled={isUploading}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            {/* Other interactive elements can be disabled based on isUploading */}
        </div>
    );
};

export default ImageUploader;