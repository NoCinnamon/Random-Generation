
const moodButton = document.querySelector("#mood-button");
const moodInput = document.querySelector(".mood-input");
const moodGif = document.querySelector("#mood-gif");


moodButton.addEventListener("click", async function() {
    const userMood = moodInput.value.trim().toLowerCase();
    const response = await fetch("data.json");                        // fetch raw data from data.json
    const data = await response.json();                                  // turn raw data result into js object i can use

    let opposite = data.oppositeMood[userMood];
    if(! opposite){
        opposite = data.oppositeMood["slap"];
    };
    console.log(opposite);  

    const gifResponse = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(opposite)}&limit=1`
    );
    const gifData = await gifResponse.json();
    const gifUrl = gifData.data[0].images.original.url;
    moodGif.src = gifUrl;   // show the gif on the page
})

