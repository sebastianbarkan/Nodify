import styles from "./TakePhoto.module.css"
import Webcam from "react-webcam";
import React, { useRef, useState } from 'react'
import EXIF from "exif-js";

export default function TakePhoto() {

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [photoDataUrl, setPhotoDataUrl] = useState(null);

    const capturePhoto = () => {
        const photoDataUrl = webcamRef.current.getScreenshot();
        const blob = dataURItoBlob(photoDataUrl);
        
        console.log(photoDataUrl)
      
        EXIF.getData(blob, function () {
            var exifData = EXIF.pretty(this);
            if (exifData) {
                console.log(exifData);
                console.log(EXIF.getTag(this, "Orientation"));
            } else {
                console.log("No EXIF data found in image.");
            }
        });

        setPhotoDataUrl(photoDataUrl);
    };

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        return blob;
    }

    return (
        <main className={styles.wrapper}>
            <div className={styles.webcam}>
                {photoDataUrl ? (
                    <div>
                        <h2>Captured Photo:</h2>
                        <img src={photoDataUrl} alt="Captured" />
                    </div>
                ) : (
                    <Webcam ref={webcamRef} />
                )}
            </div>

            <div className="btn-container">
                <button onClick={capturePhoto}>Capture photo</button>
            </div>
        </main>
    );
}

