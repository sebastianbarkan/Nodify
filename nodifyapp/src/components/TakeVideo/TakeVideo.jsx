import styles from "./TakeVideo.module.css";
import Webcam from "react-webcam";
import React, { useRef, useState } from "react";

export default function TakeVideo() {
    const webcamRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoSrc, setVideoSrc] = useState(null);

    const startRecording = () => {
        setRecording(true);
        setVideoSrc(null);

        // Access the webcam stream and start recording
        if (webcamRef.current) {
            const videoConstraints = {
                facingMode: "user", // Use the user-facing camera
                width: "100%",       // Set your preferred video width
                height: 330,       // Set your preferred video height
            };

            const mediaRecorderOptions = {
                mimeType: "video/webm",
            };

            navigator.mediaDevices
                .getUserMedia({ video: videoConstraints })
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions);
                    const chunks = [];

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            chunks.push(event.data);
                        }
                    };

                    mediaRecorder.onstop = () => {
                        const videoBlob = new Blob(chunks, { type: "video/webm" });
                        const videoUrl = URL.createObjectURL(videoBlob);
                        setVideoSrc(videoUrl);
                    };

                    mediaRecorder.start();
                })
                .catch((error) => {
                    console.error("Error accessing webcam:", error);
                });
        }
    };

    // const stopRecording = () => {
    //     mediaRecorder.stop();
    //     stream.getTracks().forEach((track) => track.stop());
    //     setRecording(false);
    // }

    return (
        <main className={styles.wrapper}>
            <div className={styles.webcam}>
                {recording ? (
                    <div >
                        <h2>Recording...</h2>
                        <div className={styles.webcam}>
                            <Webcam
                                audio={false} // Disable audio recording
                                ref={webcamRef}
                                mirrored={true} // Mirror the video for user-facing camera
                            />
                        </div>
                    </div>
                ) : videoSrc ? (
                    <div>
                        <h2>Recorded Video:</h2>
                        <video
                            src={videoSrc}
                            controls
                            autoPlay
                            loop
                            width="100%"
                            height="330px"
                        ></video>
                    </div>
                ) : (
                    <div className={styles.webcam}>
                        <Webcam
                            audio={false} // Disable audio recording
                            ref={webcamRef}
                            mirrored={true} // Mirror the video for user-facing camera
                        />
                    </div>

                )}
            </div>

            <div className="btn-container">
                {!recording ? (
                    <button onClick={startRecording}>Start Recording</button>
                ) : (
                    <button >Stop Recording</button>
                )}
            </div>
        </main>
    );
}
