$("document").ready(function() {
  const $textTweet = $("#tweet-text");
  $textTweet.on('keyup', function(e) {
    const $tweet = $(this).val();
    const charCount = 140;
    const $counter = $($(this).parent('form')).find('.counter');
    const remainingChar = charCount- $tweet.length;
    $counter.toggleClass('over-limit',$tweet.length > charCount);
    $counter.text(remainingChar);
  })
});