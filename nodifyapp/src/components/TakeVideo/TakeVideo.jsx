import styles from "./TakeVideo.module.css"
import Webcam from "react-webcam";
import React, { useRef, useState } from 'react'

export default function TakeVideo() {

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [photoDataUrl, setPhotoDataUrl] = useState(null);

    const capturePhoto = () => {
        const photoDataUrl = webcamRef.current.getScreenshot();
        
        setPhotoDataUrl(photoDataUrl);
    };

    return (
        <main className={styles.wrapper}>
            <div className={styles.webcam}>
                {photoDataUrl ? (
                    <div>
                        <h2>Captured Photo:</h2>
                        <img src={photoDataUrl} alt="Captured" />
                    </div>)
                    :
                    <Webcam ref={webcamRef}></Webcam>
                }
            </div>

            <div className="btn-container">
                <button onClick={capturePhoto}>Capture photo</button>
            </div>
        </main>
    )
};


