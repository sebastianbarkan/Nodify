import styles from "./CreateTweet.module.css"
import Webcam from "react-webcam";
import React, { useEffect, useRef, useState } from 'react'
import TakePhoto from "../../components/TakePhoto/TakePhoto.jsx";

export default function CreateTweet() {
    const [isPhoto, setIsPhoto] = useState({ data: null, meta: null });
    const [media, setMedia] = useState(null)

    useEffect(() => {
        if (media) {
            const formData = new FormData();
            formData.append('image', media.data, 'image.jpg');
            createTweetWithMedia(formData)
        }
    }, [media])


    async function createTweetWithMedia(formData) {
        try {

            // Make a POST request to create the tweet
            const tweetResponse = await fetch('http://localhost:5000/api.twitter.com/2/tweet', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `1699251695212007424-gPUzaAvsudK3bxueUyv6bwSB7B1zaI`, // Replace with your Twitter API access token
                },
            });

            // Check if the tweet was successfully created
            if (tweetResponse.ok) {
                const tweetResult = await tweetResponse.json();
                return tweetResult.data;
            } else {
                // Handle the error response
                const errorData = await tweetResponse.json();
                console.error('Error creating tweet:', errorData.errors);
                throw new Error('Failed to create tweet.');
            }
        } catch (e) {
            console.error('Error creating tweet:', e);
            throw new Error('Failed to create tweet.');
        }
    }


    const createTweet = async () => {




        // try {
        //     const formData = new FormData();
        //     // Create a FormData object and append the videoBlob to it.
        //     formData.append('media', media.data, '')
        //     // Make the fetch POST request to your Express route.
        //     const response = await fetch('/tweet', {
        //         method: 'POST',
        //         body: formData,
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log('Media ID:', data.media_id);
        //     } else {
        //         console.error('Failed to upload media.');
        //     }
        // } catch (error) {
        //     console.error('Error uploading media:', error);
        // }
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