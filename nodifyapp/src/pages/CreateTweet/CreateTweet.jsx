import styles from "./CreateTweet.module.css"
import Webcam from "react-webcam";
import React, { useCallback, useRef, useState } from 'react'

export default function CreateTweet() {

    const WebcamComponent = () => {
        const webcamRef = useRef(null);
        const [imgSrc, setImgSrc] = useState(null);

        const capture = useCallback(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        }, [webcamRef]);

        return (
            <Webcam ref={webcamRef} />
        )
    };

    const WebcamStreamCapture = () => {
        const webcamRef = useRef(null);
        const mediaRecorderRef = useRef(null);
        const [capturing, setCapturing] = RuseState(false);
        const [recordedChunks, setRecordedChunks] = React.useState([]);

        const handleStartCaptureClick = React.useCallback(() => {
            setCapturing(true);
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.addEventListener(
                "dataavailable",
                handleDataAvailable
            );
            mediaRecorderRef.current.start();
        }, [webcamRef, setCapturing, mediaRecorderRef]);

        const handleDataAvailable = React.useCallback(
            ({ data }) => {
                if (data.size > 0) {
                    setRecordedChunks((prev) => prev.concat(data));
                }
            },
            [setRecordedChunks]
        );

        const handleStopCaptureClick = React.useCallback(() => {
            mediaRecorderRef.current.stop();
            setCapturing(false);
        }, [mediaRecorderRef, webcamRef, setCapturing]);

        const handleDownload = React.useCallback(() => {
            if (recordedChunks.length) {
                const blob = new Blob(recordedChunks, {
                    type: "video/webm"
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                a.download = "react-webcam-stream-capture.webm";
                a.click();
                window.URL.revokeObjectURL(url);
                setRecordedChunks([]);
            }
        }, [recordedChunks]);

        return (
            <>
                <Webcam audio={false} ref={webcamRef} />
                {capturing ? (
                    <button onClick={handleStopCaptureClick}>Stop Capture</button>
                ) : (
                    <button onClick={handleStartCaptureClick}>Start Capture</button>
                )}
                {recordedChunks.length > 0 && (
                    <button onClick={handleDownload}>Download</button>
                )}
                <WebcamStreamCapture />
            </>
        );
    };

    return (
        <main className={styles.wrapper}>
            <div className={styles.webcam}>
                <WebcamComponent style={{
                    position: "absolute",
                    textAlign: "center",
                    zindex: 8,
                    right: 0,
                    height: "100vh",
                    width: "100%",
                    objectFit: "fill",
                }}></WebcamComponent>
            </div>

            <div className="btn-container">
                <button onClick={capture}>Capture photo</button>
            </div>

        </main>
    )
}

