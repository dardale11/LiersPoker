import { core } from '@angular/compiler';

export class Card {
    rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
    suit: 'club' | 'diamond' | 'heart' | 'spade';
    
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

}

