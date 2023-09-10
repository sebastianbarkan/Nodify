// import rwClient from "./twitterClient.js"
// import express from 'express';

// const router = express.Router();

// // Define a route that handles POST requests for tweeting.
// router.post('/tweet', async (req, res) => {
//     try {
//         // Access the tweet text from the request body.
//         const { text } = req.body;

//         // Use rwClient to send the tweet.
//         await rwClient.v2.tweet({ text });

//         // Respond with a success message.
//         res.status(200).json({ message: 'Tweet sent successfully.' });
//     } catch (e) {
//         // Handle errors and respond with an error message.
//         console.error('Error sending tweet:', e);
//         res.status(500).json({ error: 'Failed to send tweet.' });
//     }
// });

// export default router;

import rwClient from "./twitterClient.js";
import express from 'express';
import multer from 'multer'; // For handling file uploads
import FormData from 'form-data'; // For creating a multipart/form-data request

const router = express.Router();

// Create a multer storage for file uploads (media)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a route that handles POST requests for tweeting with media.
router.post('/tweet', upload.single('media'), async (req, res) => {
    try {
        // Check if a media file was uploaded.
        if (!req.file) {
            return res.status(400).json({ error: 'No media file uploaded.' });
        }

        // Create a new FormData instance for the multipart/form-data request.
        const form = new FormData();
        form.append('media', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        // Upload media and get media ID.
        const mediaUploadResponse = await rwClient.v2.media.upload(form);

        // Respond with the media ID.
        res.status(200).json({ media_id: mediaUploadResponse.media.id_string });
    } catch (e) {
        // Handle errors and respond with an error message.
        console.error('Error uploading media:', e);
        res.status(500).json({ error: 'Failed to upload media.' });
    }
});

export default router;
