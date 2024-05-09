const form = document.querySelector("form");
const input = document.querySelector("form input");
const searchResults = document.querySelector("#search-results");

const currentURL = new URL(window.location.href);
const searchParams = new URLSearchParams(currentURL.search);

async function displayTopCryptos() {
  const response = await getDataFromAPI("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
  console.log(response);
  showSearchResults(response);
}

if (searchParams.has("query")) {
  getDataFromAPI(
    "https://api.coingecko.com/api/v3/search?query=" + searchParams.get("query")
  ).then((response) => {
    console.log(response);
    showSearchResults(response.coins);
  });
} else {
  displayTopCryptos();
  document.querySelector("footer").classList.add("bottom");
}

// form.addEventListener("submit", searchCrypto);

// async function searchCrypto(e) {
//   e.preventDefault();

//   if (input.value.length > 0) {
//     const response = await getDataFromAPI(
//       "https://api.coingecko.com/api/v3/search?query=" + input.value
//     );
//     console.log(response);
//     showSearchResults(response.coins);
//   }
// }

function showSearchResults(coins) {
  //   console.log(coins);
  coins.forEach((coin, index) => {
    const result = document.createElement("div");
    result.classList.add("result");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    const sno = document.createElement("span");
    sno.innerText = index + 1;

    const img = document.createElement("img");
    img.classList.add("coin-photo");
    img.src = coin.image;

    const name = document.createElement("h3");
    name.classList.add("coin-name");
    name.innerText = coin.name + " " + coin.symbol.toUpperCase();

    leftDiv.append(sno, img, name);

    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    const anchor = document.createElement("a");
    anchor.classList.add("btn");
    anchor.innerText = "More Info";
    anchor.href = "details.html?id=" + coin.id;

    rightDiv.append(anchor);

    result.append(leftDiv, rightDiv);

    searchResults.append(result);
  });
}

async function getDataFromAPI(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
