var totalSeconds = 00;
var gamePlaying = true;
let deck;




function setupGame(dealt_cards) {
    //creating a new instance of deck object
    deck = new Deck;
    deck.generate_deck();
    console.log(gamePlaying)
    deck.shuffle();
    deck.print_deck();
    deck.deal();
    if (gamePlaying === true) {
        playGame(deck);
    }

}

function playGame(deck) {

    deck.play();


}
//Click handler to start game
$("#start").on("click", function (event) {
    event.preventDefault();
    setupGame();
    startTimer();

})

//Logic to generate values for ajax call

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.name = value + suit;
        this.imageName = "https://deckofcardsapi.com/static/img/" + value + suit + ".png"
    }
}

//creating a class template for a deck of cards called Deck
class Deck {
    //constructor is called when you initiate a class
    constructor() {
        this.deck = [];
        this.dealt_cards = [];
        this.playedCards = [];
        this.p1Hand = [];
        this.p2Hand = [];
        this.cardPile = [];
    }


    //creating a function that will generate the deck
    generate_deck() {
        let values = ['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'];
        let suits = ['C', 'D', 'S', 'H'];

        //creating a loop to push each card object to the deck
        for (let s = 0; s < suits.length; s++) {
            //loop over the values
            for (let v = 0; v < values.length; v++) {
                //push the card object to the empty array
                this.deck.push(new Card(suits[s], values[v]));
            }
        }
    }

    //creating a function to print the deck
    print_deck() {
        //if nothing in the deck, print console.log
        if (this.deck.length == 0) {
            console.log('The deck has not been generated');
        } else {
            //for every card in the deck, print that card to the console
            for (let c = 0; c < this.deck.length; c++) {//c = index of each card

            }
        }
    }
    //creating a function that shuffle the deck
    shuffle() {
        let currentIndex = this.deck.length, tempVal, randIndex;
        while (0 != currentIndex) {
            //creating a random index using Math library, return a floating-point random number between zero(inclusive) and 1(not including) and time currentIndex
            randIndex = Math.floor(Math.random() * currentIndex);

            //subtract 1 from current index while cards still in current index
            currentIndex -= 1;

            //push the current index into tempVal
            tempVal = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randIndex];
            this.deck[randIndex] = tempVal;
        }
    }

    //creating a deal to Player 2 function, deal the top card from the array of the deck and return(shift) the value
    dealTo(player) {
        let hand = this.getHand(player);
        let dealt_card = this.deck.pop();
        this.dealt_cards.push(dealt_card);
        hand.push(dealt_card);
        return dealt_card;

    }
    // Creating a function to loop deal to p1 and deal to p2 for the full deck
    deal() {
        for (var a = 0; a < 26; a++) {
            this.dealTo("p1");
            this.dealTo("p2");

        }
    }
    playCard(player) {
        let hand = this.getHand(player);
        let playedCard = hand.pop();
        this.playedCards.push(playedCard);
        this.cardPile.push(playedCard);
        if (playedCard != undefined) {
            document.getElementById("cardImg").src = playedCard.imageName;
        }
        $("#p1CardTotal").html("Cards: " + this.p1Hand.length);
        $("#mainCardTotal").html("Cards: " + this.cardPile.length);
        $("#p2CardTotal").html("Cards: " + this.p2Hand.length);
        return playedCard;

    }
    play() {
        console.log("is running")
        var p1 = true;
        let self = this;
        setInterval(function () {
            if (self.p1Hand.length <= 0) {
                gamePlaying = false
                alert("Player 2 Wins!");
            } else if (self.p2Hand.length <= 0) {
                gamePlaying = false;
                alert("Player 1 Wins!");
            }
            if (gamePlaying === true) {
                if (p1 === true) {
                    self.playCard("p1");
                    p1 = false;
                    // console.log(self.cardPile);
                    console.log(self.p1Hand.length);
                }
                else {
                    self.playCard("p2");
                    p1 = true;
                    // console.log(self.cardPile);
                    console.log(self.p1Hand.length);
                }
            }


        }, 500)


    }
    slap1() {
        let pileCard = this.cardPile.pop();
        console.log(pileCard);
        if (pileCard.value == 'J') {
            this.p1Hand.push(pileCard);
            this.p1Hand = this.p1Hand.concat(this.cardPile);
            this.cardPile = [];
        }
        else {
            this.p2Hand.push(this.p1Hand.pop());
        }
    }
    slap2() {
        let pileCard = this.cardPile.pop();
        if (pileCard.value == 'J') {
            p2Hand.push(pileCard);
            this.p2Hand = this.p2Hand.concat(this.cardPile);
            this.cardPile = [];

        }
        else {
            this.p1Hand.push(p2Hand.pop());
        }
    }


    getHand(player) {
        let hand;
        if (player === "p1") {
            hand = this.p1Hand;

        } else if (player === "p2") {
            hand = this.p2Hand;


        } else {
            throw new ReferenceError("must be p1 or p2");
        }
        return hand;
    }

    // //Function to end the game
    // endGame() {
    //     gamePlaying = false;
    //     console.log(gamePlaying);
    // }


    //create a replace function to return most recently dealt card on the deck
    replace() {
        //add the value to the deck and remove from the array from the dealt_cards
        this.deck.unshift(this.dealt_cards.shift());
    }
    //reset deck back to zero
    clear_deck() {
        this.deck = [];
    }

}




// module.exports = Deck;

$("#slapBtn1").on("click", function (event) {
    console.log("in slap1");
    event.preventDefault();
    deck.slap1();
});
$("#slapBtn2").on("click", function (event) {
    event.preventDefault();
    deck.slap2();
});

//Timer Function
function startTimer() {
    var timerInterval = setInterval(function () {
        totalSeconds++;

        $("#secondsLeft").html("Timer: " + totalSeconds);
    }, 1000);
}
