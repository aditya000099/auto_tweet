require('dotenv').config();

const Twit = require('twit');
const fs = require('fs');

// Load your Twitter API credentials from environment variables
const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET
} = process.env;

// Create a new Twit instance with your API credentials
const T = new Twit({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
});

// Read the tweets from the file
const readTweetsFromFile = () => {
  try {
    const tweets = fs.readFileSync('tweets.txt', 'utf8');
    return tweets.split('\n').filter(tweet => tweet.trim() !== '');
  } catch (err) {
    console.error('Error reading tweets file:', err);
    return [];
  }
};

// Select a random tweet from the array
const getRandomTweet = (tweets) => {
  const index = Math.floor(Math.random() * tweets.length);
  return tweets[index];
};

// Post a tweet with a random tweet from the file
const postTweet = () => {
  const tweets = readTweetsFromFile();
  const tweet = getRandomTweet(tweets);
  
  T.post('statuses/update', { status: tweet }, (err, data, response) => {
    if (err) {
      console.error('Error posting tweet:', err);
    } else {
      console.log('Tweet posted successfully:', tweet);
    }
  });
};

// Post a tweet immediately when the bot starts
postTweet();

// Schedule tweets every 120 minutes
setInterval(postTweet, 120 * 60 * 1000);
