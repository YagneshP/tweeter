/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

//========createTweetElement============//

const createTweetElement = function(tweetData) {
  const {user,content,created_at} = tweetData;
  const $htmlForTweet = $(`<article class="tweeter-box">
  <header>
    <div class="profile">
      <img src='${user.avatars}' width="25%">
      <p>${user.name}</p>
    </div>
    <div>
      <p>${user.handle}</p>
    </div>
  </header>
  <main class="message">
    ${content.text}
  </main>
  <footer>
    <div>${timeago.format(created_at)}</div>
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>
  </footer>
</article>`)
  return $htmlForTweet;
};


//========== renderTweets ============//

const renderTweets = function(arr) {
   arr.forEach(el => {
    const $tweet =  createTweetElement(el);
    $('#tweet-container').append($tweet);
  });
}

$("document").ready(function() {
  renderTweets(data);
});