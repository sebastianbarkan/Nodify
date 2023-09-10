import styles from "./TakePhoto.module.css";
import Webcam from "react-webcam";
import React, { useRef, useState } from "react";
import EXIF from "exif-js";
import { Web3Storage, getFilesFromPath } from 'web3.storage'

export default function TakePhoto({setMedia}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [photoDataUrl, setPhotoDataUrl] = useState(null);
    const [showRetakeButton, setShowRetakeButton] = useState(false);

    const capturePhoto = () => {
        const photoDataUrl = webcamRef.current.getScreenshot();
        const blob = dataURItoBlob(photoDataUrl);

        EXIF.getData(blob, function () {
            const exifData = EXIF.getAllTags(this);
            if (exifData) {
                console.log(exifData);
                const gpsLatitude = parseGpsCoordinates(exifData.GPSLatitude);
                const gpsLongitude = parseGpsCoordinates(exifData.GPSLongitude);
                console.log("Reference:", gpsLatitude, gpsLongitude);
                setMedia({
                    data: blob,
                    meta: {
                        gpsLatitude,
                        gpsLongitude,
                        
                    }
                })
                console.log(EXIF.getTag(this, "Orientation"));
            } else {
                console.log("No EXIF data found in image.");
            }
        });

        setPhotoDataUrl(photoDataUrl);
        setShowRetakeButton(true);
    };

    const retakePhoto = () => {
        setPhotoDataUrl(null);
        setShowRetakeButton(false);
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

    // Function to handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0]; // Get the first selected file

        const blob = file;
        EXIF.getData(blob, function () {
            const exifData = EXIF.getAllTags(this);
            if (exifData) {
                console.log(exifData);


                const gpsLatitude = parseGpsCoordinates(exifData.GPSLatitude);
                const gpsLongitude = parseGpsCoordinates(exifData.GPSLongitude);
                console.log("Reference:", gpsLatitude, gpsLongitude);
                console.log(EXIF.getTag(this, "Orientation"));
            } else {
                console.log("No EXIF data found in image.");
            }
        });

        setSelectedFile(file);
        setPhotoDataUrl(file);
        setShowRetakeButton(true);
    };

    // Helper function to parse GPS coordinates from an array
    function parseGpsCoordinates(gpsArray) {
        if (!Array.isArray(gpsArray) || gpsArray.length !== 3) {
            return undefined;
        }

        const degrees = gpsArray[0];
        const minutes = gpsArray[1];
        const seconds = gpsArray[2];

        // Calculate the decimal degree value
        const decimalDegrees = degrees + minutes / 60 + seconds / 3600;

        return decimalDegrees;
    }

    // Function to handle file upload (you can send the file to your server here)
    const handleFileUpload = async () => {
        if (selectedFile) {
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUzRTk2YzRGMWQ4ZWE5MTdiMzc3MUZGMzQwNzM5QWU2NDdEZDRFMzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTQzMjM0OTYyMTIsIm5hbWUiOiJleWUgcGVlIGVmZmVjdHMgIn0.580awrN7e3cJu65D1i-vV1yfst1KtE1sqsu3x3nAzng"
            const storage = new Web3Storage({ token })
            const files = []
            files.push(selectedFile)
            console.log(`Uploading ${files.length} files`)
            const cid = await storage.put(files)
            console.log('Content added with CID:', cid)

            // You can perform any actions here with the selected file, e.g., send it to your server using an API.
            // For simplicity, we're just logging the file details.
            console.log("Selected File:", selectedFile);
        } else {
            console.log("No file selected.");
        }
    };

    return (
        <main className={styles.wrapper}>
            <div className={styles.mediaWrap}>
                <div className={styles.webcam}>
                    {photoDataUrl ? (
                        <img src={photoDataUrl} alt="Captured" height={200} />
                    ) : (
                        <Webcam ref={webcamRef} />
                    )}
                </div>
                <div className={styles.buttonWrap}>
                    {showRetakeButton ? (
                        <div className="btn-container">
                            <button onClick={retakePhoto} className={styles["btn-retake"]}>Retake Photo</button>
                        </div>
                    )
                        :
                        <div className="btn-container">
                            <button onClick={capturePhoto} className={styles["btn-capture"]}>Capture photo</button>
                        </div>
                    }
                    <input type="file" accept="image/*" onChange={handleFileSelect} />
                    <button onClick={handleFileUpload}>Upload Photo</button>
                </div>
            </div>
            <form className={styles.form}></form>
        </main >
    );
}
