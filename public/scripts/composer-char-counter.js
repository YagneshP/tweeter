$("document").ready(function() {
  const $textTweet = $("#tweet-text");
  $textTweet.on('keyup', function(e) {
    const $tweet = $(this).val();
    const wordCount = 140;
    const $counter = $($(this).parent('form')).find('.counter');
    const remainingWords = wordCount- $tweet.length;
    $counter.toggleClass('over-limit',$tweet.length > wordCount);
    $counter.text(remainingWords);
  })
});