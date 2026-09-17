
const moodInputButton = document.querySelector("#button-hitMe");
const moodInput = document.querySelector(".mood-input");
const moodGif = document.querySelector("#mood-gif");


moodInputButton.addEventListener("click", async function() {
    const userMood = moodInput.value.trim().toLowerCase();
    const response = await fetch("data.json");                        // fetch raw data from data.json
    const data = await response.json();                                  // turn raw data result into js object i can use

    let opposite = data.oppositeMood[userMood];
    if(! opposite){
        opposite = data.oppositeMood["slap"];
    };
    console.log(opposite);  

    const gifResponse = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(opposite)}&limit=25`
    );
    const gifData = await gifResponse.json();
    const randomIndex = Math.floor(Math.random() * gifData.data.length);
    const gifUrl = gifData.data[randomIndex].images.original.url;
    moodGif.src = gifUrl; 
})


const makeSaladButton = document.querySelector("#button-makeSalad");
const saladBox = document.getElementById("salad-result");

function randomPick(saladArr){
    return saladArr[Math.floor(Math.random() * saladArr.length)]    
}

makeSaladButton.addEventListener("click", async function(){
    const protein = document.querySelector("#protein").value.trim().toLowerCase();
    const greens = document.querySelector("#greens").value.trim().toLowerCase();
    const dressing = document.querySelector("#dressing").value.trim().toLowerCase();

    const response = await fetch("data.json"); 
    const data = await response.json();
    const salad = data.makeSalad;
    const topping = randomPick(salad.toppings);
    const sauce = randomPick(salad.sauces);
    const liquid = randomPick(salad.liquids);
    const whatever = randomPick(salad.whatevers);
    const oil = randomPick(salad.oils);

    const saladResult = document.createElement("pre");
    saladResult.textContent = 
    `Your Mystery Salad:
    -------------------
    Greens:    ${greens}
    Protein:   ${protein}
    Dressing:  ${dressing}
    Topping:   ${topping}
    Sauce:     ${sauce}
    Liquid:    ${liquid}
    Whatever:  ${whatever}
    Oil:       ${oil};\n
    
    And, voilà! you got your salad!
    have a miserable day!`;

    saladBox.replaceChildren(saladResult);  
})