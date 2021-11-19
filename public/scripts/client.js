/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$("document").ready(function() {
  const $error = $("#error-display");
  const $writeTweetBtn = $(".write-tweet");
  const $tweetForm = $(".new-tweet form");
  $error.hide();
  $tweetForm.hide();

  //======= togglingForm(strecth)========//
  $writeTweetBtn.on("click", function() {
    $tweetForm.toggle("fast");
  });

  //========createTweetElement============//
  const createTweetElement = function(tweetData) {
    const { user, content, created_at } = tweetData;
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
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
      ${escape(content.text)}
    </main>
    <footer>
      <div>${timeago.format(created_at)}</div>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $htmlForTweet;
  };

  //========== renderTweets ============//

  const renderTweets = function(arr) {
    arr.forEach((el) => {
      const $tweet = createTweetElement(el);
      $("#tweet-container").prepend($tweet);
    });
  };

  //===== load tweet =====//
  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then((data) => renderTweets(data))
      .catch((err) => console.log("get err:", err));
  };

  loadTweets();
  //========== AJAX submit ==========//

  $tweetForm.submit(function(e) {
    e.preventDefault();
    const $textArea = $(this).children("textarea");
    const $counter = $(".counter");
    const $tweet = $textArea.val();

    if ($tweet) {
      if ($tweet.length > 140) {
        $error.html(
          '<p> <i class="fas fa-exclamation-triangle"></i> Too many characters! Make sure your tweet is not more than 140 words <i class="fas fa-exclamation-triangle"></i> </p>'
        );
        $error.slideDown();
      } else {
        const $serializedData = $(this).serialize();
        $.post("/tweets", $serializedData)
          .done(() => {
            $error.hide();
            $textArea.val("");
            $("#tweet-container").empty();
            $counter.text("140");
            loadTweets();
          })
          .fail(() => {
            $error.html(
              '<p> <i class="fas fa-exclamation-triangle"></i> Something is not right! from server <i class="fas fa-exclamation-triangle"></i> </p>'
            );
            $error.slideDown();
          });
      }
    } else {
      $error.html(
        '<p> <i class="fas fa-exclamation-triangle"></i> Your tweet should not be empty! <i class="fas fa-exclamation-triangle"></i> </p>'
      );
      $error.slideDown();
    }
  });
});
