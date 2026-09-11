
const moodButton = document.querySelector("#mood-button");
const moodInput = document.querySelector(".mood-input");


moodButton.addEventListener("click", async function() {
    const userMood = moodInput.value.trim().toLowerCase();
    const response = await fetch("../data.json")                       // fetch raw data from data.json
    const data = await response.json()                                  // turn raw data result into js object i can use

    let opposite = data.oppositeMood[userMood]
    if(! opposite){
        opposite = data.oppositeMood["slap"]
    }
    console.log(opposite);  
})