//creating a class template for a deck of cards called Deck
class Deck {
    //constructor is called when you initiate a class
    constructor() {
        this.deck = [];
        this.dealt_cards = [];
    }
    //creating a function that will generate the deck
    generate_deck() {
        let card = (suit, value) => {
            this.name = value + suit;
            this.suit = suit;
            this.value = value;

            return {name:this.name}
        }

        let values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        let suits = ['C', 'D', 'S', 'H'];

        //creating a loop to push each card object to the deck
        for(let s = 0; s < suits.length; s++){
            //loop over the values
            for(let v = 0; v < values.length; v++){
                //push the card object to the empty array
                this.deck.push(card(suits[s], values[v]));
            }
        }
    }

    //creating a function to print the deck
    print_deck () {
        //if nothing in the deck, print console.log
        if(this.deck.length == 0){
            console.log('The deck has not been generated');
        }else{
            //for every card in the deck, print that card to the console
            for(let c = 0; c < this.deck.length; c++){//c = index of each card
                console.log(this.deck[c]);
            }
        }
    }
    //creating a function that shuffle the deck
    shuffle () {
        let currentIndex = this.deck.length, tempVal, randIndex;
        while(0 != currentIndex){
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
    //creating a deal function, deal the top card from the array of the deck and return(shift) the value
    deal() {
        let dealt_card = this.deck.shift();
        this.dealt_cards.push(dealt_card);
        return dealt_card;
    }
    
    //create a replace function to return most recently dealt card on the deck
    replace (){
        //add the value to the deck and remove from the array from the dealt_cards
        this.deck.unshift(this.dealt_cards.shift());
    }
    //reset deck back to zero
    clear_deck() {
        this.deck = [];
    }

}
//creating a new instance of deck object
deck = new Deck();

//calling the function with new instance
deck.generate_deck();

//calling the print function
deck.print_deck();

//calling the shuffle function and print function
deck.shuffle();
deck.print_deck();

console.log(deck.deal());

module.exports = Deck;


