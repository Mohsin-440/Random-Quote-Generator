const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader"); 

// Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Loading Complete
const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get Quote From API
async function getQuote() {
    loading();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // If author is blank, add unknown

    if(data.quoteAuthor === ''){
      authorText.innerText = 'unknown';
    }else{
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font-size for long quotes

    if(data.quoteText.length > 120){
      quoteText.classList.add('long-quote');
    }else{
      quoteText.classList.remove('long-quote');
    }
    
    quoteText.innerText = data.quoteText;
    complete();
    // console.log(data);
  } catch (error) {
    getQuote();

    // console.log('woops an error occured ',error);
  }
}

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

// Load data
getQuote();



// Visit this when Api is not wprking properly 
// https://cors-anywhere.herokuapp.com/corsdemo