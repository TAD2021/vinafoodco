import Image from "next/image";
import { useState } from "react";

function ImageGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <>
            <Image 
                alt="Product image" 
                className="w-full mb-4 object-cover" 
                height={400}
                width={300}
                src={selectedImage}
            />
            <div className="flex space-x-2">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-16 h-16 border cursor-pointer" 
                        width={60}
                        height={60}
                        src={image} 
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        </>
    );
}

export default ImageGallery;