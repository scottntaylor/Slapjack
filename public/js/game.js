let deck = [];
let p1Hand = [];
let p2Hand = [];
let cardPile = [];

//API call for new deck
getDeck();

// creates a new, shuffled deck to play this game with
function getDeck() {
    $.ajax({
        url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
        method: "GET"
    }).then(function (newDeck) {
        console.log("Game Deck");
        console.log("------------------");
        console.log(newDeck);
        // defines deck ID for the game to refference
        thisDeck = newDeck.deck_id;
    })

};


//draw a card for player
// function drawCard(cardCount) {
//     $.ajax({
//         url: "https://deckofcardsapi.com/api/deck/" + thisDeck + "/draw/?count=" + cardCount,
//         method: "GET"
//     }).then(function (drawnCard) {

//         console.log(drawnCard);
//         // grabs card code so that card can be assigned to proper hand
//         for (var i = 0; i < cardCount; i++) {
//             cardName.push(drawnCard.cards[i].code);
//         }
//         p1Hand.push(drawnCard.cards[0].value);
//         p1Hand.push(drawnCard.cards[2].value);
//         dealerCards.push(drawnCard.cards[1].value);
//         dealerCards.push(drawnCard.cards[3].value);
//         firstDeal();
//     })

// };

// function dealCardsP1(){
//     for (var i = 0; i <26; i++){
//         drawCard();
//     }
// }