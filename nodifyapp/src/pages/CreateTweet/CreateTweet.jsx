import styles from "./CreateTweet.module.css"
import Webcam from "react-webcam";
import React, { useRef, useState } from 'react'
import TakePhoto from "../../components/TakePhoto/TakePhoto.jsx";
import TakeVideo from "../../components/TakeVideo/TakeVideo.jsx";

export default function CreateTweet() {

    const [isPhoto, setIsPhoto] = useState(true);

    const createTweet = () => {
        const apiUrl = 'http://localhost:5000/api/gettweets';

        // Make a GET request to your Express route
        fetch(apiUrl)
            .then((response) => {
                // Check if the response status is OK (200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Handle the JSON response data
                console.log(data);
            })
            .catch((err) => {
                // Handle errors
                console.log(err.message);
            });
    }

    return (
        <main className={styles.wrapper}>
            <div className={styles["input-type-wrap"]}>
                <span className={styles["toggle-wrap"]}>
                    <button type="button" onClick={() => setIsPhoto(true)}>Photo</button>
                    <button type="button" onClick={() => setIsPhoto(false)}>Video</button>
                </span>
            </div>
            <div>
                {isPhoto ?
                    <TakePhoto />
                    :
                    <TakeVideo />
                }
            </div>
            <div className="btn-container">
                <button onClick={createTweet}>Create Tweet</button>
            </div>
        </main>
    )
};