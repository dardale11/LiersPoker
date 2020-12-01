import { Card } from './Card';

export class Hand {
    private cards: Card[] = [];
    private map: number[][] = [];
    private type: HandType;

    constructor(cards) {
        this.cards = cards;
        for (const type in HandType) {
            if (!isNaN(Number(type))) {
                this.map[type] = [];
            }
        }
        this.setHandFromCards();
        this.setHandType();
    }

    setHandFromCards() {
        let cardCount = []
        this.cards.forEach(card => {
            if (cardCount[card.rank]) {
                cardCount[card.rank]++;
            } else {
                cardCount[card.rank] = 1;
            }
        });
        for (let rank in cardCount) {
            switch (cardCount[rank]) {
                case 1:
                    this.map[HandType.SINGLE].push(parseInt(rank));
                    break;
                case 2:
                    this.map[HandType.PAIR].push(parseInt(rank));
                    break;
                case 3:
                    this.map[HandType.TRIPLET].push(parseInt(rank));
                    break;
                case 4:
                    this.map[HandType.FOURET].push(parseInt(rank));
                    break;
            }
        }
        for (let index = 0; index < this.map.length; index++) {
            this.map[index].sort((a, b) => b - a);
        }
    }

    setHandType() {
        if (this.map[HandType.FOURET].length > 0) {
            this.type = HandType.FOURET;
            return;
        }
        if (this.map[HandType.TRIPLET].length > 0 && this.map[HandType.PAIR].length > 0) {
            this.type = HandType.FULL_HOUSE;
            return;
        }
        if (this.map[HandType.TRIPLET].length > 0) {
            this.type = HandType.TRIPLET;
            return;
        }
        if (this.map[HandType.PAIR].length > 1) {
            this.type = HandType.TWO_PAIRS;
            return;
        }
        if (this.map[HandType.PAIR].length > 0) {
            this.type = HandType.PAIR;
            return;
        }
        this.type = HandType.SINGLE;
    }

    compareTo(hand: Hand) {
        if (this.type - hand.type != 0) {
            return this.type - hand.type;
        }

        if (this.type == HandType.FOURET) {
            return this.map[HandType.FOURET][0] - hand.map[HandType.FOURET][0];
        }

        if (this.type == HandType.FULL_HOUSE || this.type == HandType.TRIPLET) {
            return this.map[HandType.TRIPLET][0] - hand.map[HandType.TRIPLET][0];
        }

        if (this.type == HandType.TWO_PAIRS) {
            if (this.map[HandType.PAIR][0] - hand.map[HandType.PAIR][0] != 0) {
                return this.map[HandType.PAIR][0] - hand.map[HandType.PAIR][0];
            }
            if (this.map[HandType.PAIR][1] - hand.map[HandType.PAIR][1] != 0) {
                return this.map[HandType.PAIR][1] - hand.map[HandType.PAIR][1];
            }

            if (this.map[HandType.SINGLE].length > 0 && hand.map[HandType.SINGLE].length > 0) {
                return this.map[HandType.SINGLE][0] - hand.map[HandType.SINGLE][0];
            }

            if (this.map[HandType.SINGLE].length > 0 && hand.map[HandType.SINGLE].length == 0) {
                return 1;
            }

            if (this.map[HandType.SINGLE].length == 0 && hand.map[HandType.SINGLE].length > 0) {
                -1;
            }

            return 0;
        }

        if (this.type == HandType.PAIR) {
            if (this.map[HandType.PAIR][0] - hand.map[HandType.PAIR][0] != 0) {
                return this.map[HandType.PAIR][0] - hand.map[HandType.PAIR][0];
            }
        }

        for (let index = 0; index < Math.min(this.map[HandType.SINGLE].length, hand.map[HandType.SINGLE].length); index++) {
            if (this.map[HandType.SINGLE][index] && hand.map[HandType.SINGLE][index] && this.map[HandType.SINGLE][index] - hand.map[HandType.SINGLE][index] != 0) {
                return this.map[HandType.SINGLE][index] - hand.map[HandType.SINGLE][index];
            }
            if (this.map[HandType.SINGLE][index] && !hand.map[HandType.SINGLE][index]) {
                return 1;
            }
            if (!this.map[HandType.SINGLE][index] && hand.map[HandType.SINGLE][index]) {
                return -1;
            }

        }
        return 0;
    }
}



export enum HandType {
    SINGLE,
    PAIR,
    TWO_PAIRS,
    TRIPLET,
    FULL_HOUSE,
    FOURET
}