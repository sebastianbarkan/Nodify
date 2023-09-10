import rwClient from "./twitterClient.js"
import express from 'express';

const router = express.Router();

// Define a route that handles POST requests for tweeting.
router.post('/tweet', async (req, res) => {
    try {
        // Access the tweet text from the request body.
        const { text } = req.body;

        // Use rwClient to send the tweet.
        await rwClient.v2.tweet({ text });

        // Respond with a success message.
        res.status(200).json({ message: 'Tweet sent successfully.' });
    } catch (e) {
        // Handle errors and respond with an error message.
        console.error('Error sending tweet:', e);
        res.status(500).json({ error: 'Failed to send tweet.' });
    }
});

export default router;