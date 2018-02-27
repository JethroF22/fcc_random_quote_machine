$(function() {
  $(".carousel").carousel({ pause: true, interval: false });
  $("#fetch_quote").click(function() {
    $("#quote-display").fadeToggle();
    $("#twitter-share").fadeOut();
    var key = parseInt(Math.random() * 999999);
    $.getJSON(
      "https://api.forismatic.com/api/1.0/?method=getQuote&key=" +
        key +
        "&lang=en&format=jsonp&jsonp=?"
    ).done(function(data) {
      var quote = data.quoteText;
      var author = data.quoteAuthor ? data.quoteAuthor : "Author Unknown";
      $("#quote-display")
        .html('<em>"' + quote + '" (' + author + ")</em>")
        .fadeToggle();
      var tweet_url =
        "https://twitter.com/intent/tweet?text=" +
        $("#quote-display em").html();
      $("#twitter-share").attr("href", tweet_url);
      $("#twitter-share").fadeIn();

      $(".carousel").carousel("next");
      $(".carousel").carousel({ pause: true, interval: false });
    });
  });

  $(document)
    .ajaxStart(function() {
      $("#fetch_quote").attr("disabled", "disabled");
    })
    .ajaxComplete(function() {
      $("#fetch_quote").removeAttr("disabled");
    });
});
