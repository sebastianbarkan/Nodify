import React, { useState } from 'react';
import axios from 'axios';

const TwitterPost = () => {
  const [tweetContent, setTweetContent] = useState('');

  const handleTweetChange = (event) => {
    setTweetContent(event.target.value);
  };

  const handleTweetSubmit = async (event) => {
    event.preventDefault();

    const twitterApiUrl = 'https://api.twitter.com/1.1/statuses/update.json';
    const tweetData = {
      status: tweetContent,
    };

    try {
      const response = await axios.post(twitterApiUrl, tweetData, {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        },
      });

      console.log('Tweet successfully sent:', response.data);
      // Optionally, you can update your UI to show that the tweet was sent.
    } catch (error) {
      console.error('Error sending tweet:', error);
      // Handle error and show appropriate messages to the user.
    }
  };

  return (
    <div>
      <h1>Create and Submit Tweets</h1>
      <form onSubmit={handleTweetSubmit}>
        <textarea
          value={tweetContent}
          onChange={handleTweetChange}
          placeholder="What's happening?"
        />
        <button type="submit">Tweet</button>
      </form>
    </div>
  );
};

export default TwitterPost;
