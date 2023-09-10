// app.js
import express from 'express';
import tweetRoute from './tweetRoute.js';
import cors from 'cors'; // Import the cors middleware

const app = express();

// Enable CORS for all routes
const corsOptions = {
    origin: 'http://localhost:3000',
  };

app.use(cors(corsOptions));

// Use the tweet route.
app.use('/api', tweetRoute);

// Start your Express server.
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
