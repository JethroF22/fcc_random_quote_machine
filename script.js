const quoteButton = document.getElementById("fetch_quote");
const quoteDisplay = document.getElementById("quote-display");
const twitterButton = document.getElementById("twitter-share");
const backgroundDiv = document.getElementById("bg-img");

const quoteScript = document.createElement("script");
let currentBackgroundIndex = 0;

const imageSources = [
  "https://i.imgur.com/7q5er0P.jpg",
  "https://i.imgur.com/hvO1yfF.jpg",
  "https://i.imgur.com/jOlIdII.jpg",
  "https://i.imgur.com/waJ33kA.jpg",
  "https://i.imgur.com/FMA5Y3v.jpg"
];

function changeBackground() {
  currentBackgroundIndex =
    currentBackgroundIndex === imageSources.length - 1
      ? 0
      : currentBackgroundIndex + 1;
  backgroundDiv.style.backgroundImage = `url(${
    imageSources[currentBackgroundIndex]
  })`;
  backgroundDiv.classList.add("fade-in");
}

function fetchQuote(params) {
  // Make AJAX request

  const key = parseInt(Math.random() * 999999);
  const url = `http://cors-anywhere.herokuapp.com/api.forismatic.com/api/1.0/?method=getQuote&key=${key}&lang=en&format=json`;

  const xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open("GET", url, true);
    xhr.onload = function() {
      if (this.status === 200) {
        displayQuote(JSON.parse(this.responseText));
      }
    };
    xhr.send();
  }
}

function displayQuote(data) {
  const quote = data["quoteText"];
  const author = data["quoteAuthor"] ? data["quoteAuthor"] : "Author Unknown";
  quoteDisplay.innerHTML = `<em>"${quote}" (${author})</em>`;
  quoteDisplay.classList.add("fade-in");
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote}`;
  twitterButton.href = tweetUrl;
  if (!twitterButton.style.display) {
    twitterButton.style.display = "block";
  }
  twitterButton.classList.add("fade-in");
  changeBackground();
}

quoteButton.addEventListener("click", fetchQuote);
quoteDisplay.addEventListener("animationend", () => {
  quoteDisplay.classList.remove("fade-in");
});
twitterButton.addEventListener("animationend", () => {
  twitterButton.classList.remove("fade-in");
});
backgroundDiv.addEventListener("animationend", () => {
  backgroundDiv.classList.remove("fade-in");
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
