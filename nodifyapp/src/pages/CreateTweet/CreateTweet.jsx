import styles from "./CreateTweet.module.css"
import Webcam from "react-webcam";
import React, { useRef, useState } from 'react'
import TakePhoto from "../../components/TakePhoto/TakePhoto.jsx";

// import TakeVideo from "../../components/TakeVideo/TakeVideo.jsx";

export default function CreateTweet() {

    const [isPhoto, setIsPhoto] = useState({ data: null, meta: null });
    const [media, setMedia] = useState(null)

    const createTweet = async () => {

        try {
            const formData = new FormData();
            // Create a FormData object and append the videoBlob to it.
            formData.append('media', media.data, '')
            // Make the fetch POST request to your Express route.
            const response = await fetch('/tweet', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Media ID:', data.media_id);
            } else {
                console.error('Failed to upload media.');
            }
        } catch (error) {
            console.error('Error uploading media:', error);
        }
    }

    return (
        <main className={styles.wrapper}>
            {/* <div className={styles["input-type-wrap"]}>
                <span className={styles["toggle-wrap"]}>
                    <button type="button" onClick={() => setIsPhoto(true)} className={isPhoto ? styles.selected : styles.default}>Photo</button>
                    <button type="button" onClick={() => setIsPhoto(false)} className={isPhoto ? styles.default : styles.selected}>Video</button>
                </span>
            </div> */}

            <div>
                <TakePhoto setMedia={setMedia} />
            </div>
            <div className="btn-container">
                <button onClick={createTweet} className={styles["btn-create"]}>Create Tweet</button>
            </div>
        </main>
    )
};