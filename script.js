const quoteButton = document.getElementById("fetch_quote");
const quoteDisplay = document.getElementById("quote-display");
const quoteText = document.getElementById("quote-text");
const twitterButton = document.getElementById("twitter-share");
const backgroundDiv = document.getElementById("bg-img");

const quoteScript = document.createElement("script");
let currentBackgroundIndex = 0;

function fetchQuote(params) {
  quoteDisplay.classList.add("fade-out");
  // Make AJAX request

  const key = parseInt(Math.random() * 999999);
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&key=${key}&lang=en&format=json`;

  fetch(url)
    .then(response => {
      return response.text();
    })
    .then(data => {
      try {
        displayQuote(JSON.parse(data));
      } catch (error) {
        displayError("parsing error");
      }
    })
    .error(err => {});

  // const xhr = new XMLHttpRequest();
  // if ("withCredentials" in xhr) {
  //   xhr.open("GET", url, true);
  //   xhr.onload = function() {
  //     if (this.status === 200) {
  //       displayQuote(JSON.parse(this.responseText));
  //     }
  //   };
  //   xhr.send();
  // }
}

function displayQuote(data) {
  const quote = data["quoteText"];
  const author = data["quoteAuthor"] ? data["quoteAuthor"] : "Author Unknown";
  quoteText.innerHTML = `<em>"${quote}" (${author})</em>`;
  quoteDisplay.classList.remove("fade-out");
  quoteDisplay.classList.add("fade-in");
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote}`;
  twitterButton.href = tweetUrl;
  if (!twitterButton.style.display) {
    twitterButton.style.display = "block";
  }
  twitterButton.classList.add("fade-in");
}

// function displayError(error) {
//   if (condition) {

//   } else {

//   }
// }

quoteButton.addEventListener("click", fetchQuote);
quoteDisplay.addEventListener("animationend", e => {
  if (e.animationName === "fadeIn") {
    quoteDisplay.classList.remove("fade-in");
  }
});
twitterButton.addEventListener("animationend", () => {
  twitterButton.classList.remove("fade-in");
});

// $(function() {
//   $("#fetch_quote").click(function() {
//     $("#quote-display").fadeToggle();
//     $("#twitter-share").fadeOut();
//     var key = parseInt(Math.random() * 999999);
//     $.getJSON(
//       "https://api.forismatic.com/api/1.0/?method=getQuote&key=" +
//         key +
//         "&lang=en&format=jsonp&jsonp=?"
//     ).done(function(data) {
//       var quote = data.quoteText;
//       var author = data.quoteAuthor ? data.quoteAuthor : "Author Unknown";
//       $("#quote-display")
//         .html('<em>"' + quote + '" (' + author + ")</em>")
//         .fadeToggle();
//       var tweet_url =
//         "https://twitter.com/intent/tweet?text=" +
//         $("#quote-display em").html();
//       $("#twitter-share").attr("href", tweet_url);
//       $("#twitter-share").fadeIn();

//       $(".carousel").carousel("next");
//       $(".carousel").carousel({ pause: true, interval: false });
//     });
//   });

//   $(document)
//     .ajaxStart(function() {
//       $("#fetch_quote").attr("disabled", "disabled");
//     })
//     .ajaxComplete(function() {
//       $("#fetch_quote").removeAttr("disabled");
//     });
// });
