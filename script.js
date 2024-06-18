
var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];
let data;
var currentQuote = '';
var currentAuthor = '';
const getQuotes = () => {
    return $.ajax({
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function (jsonQuote) {
            if (typeof jsonQuote === "string") {
                data = JSON.parse(jsonQuote);
            }
        }
    })
}

const getRandomQuote = () => {
    return data.quotes[Math.floor(Math.random() * data.quotes.length)];
}

const getQuote = () => {
    const quote = getRandomQuote();

    currentQuote = quote.quote;
    currentAuthor = quote.author;

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $('#tumblr-quote').attr(
        'href',
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(currentAuthor) +
        '&content=' +
        encodeURIComponent(currentQuote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );

    $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 1000);
        $('#text').text(quote.quote);
    });

    $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 1000);
        $('#author').html(quote.author);
    });
    var color = Math.floor(Math.random() * colors.length);

    $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
    }, 1000);

    $(".button").animate({
        backgroundColor: colors[color]
    }, 1000);
}

$(document).ready(() => {
    getQuotes().then(() => {
        getQuote();
    })

    $("#new-quote").on("click", getQuote);
})