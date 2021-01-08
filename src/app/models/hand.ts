import { Card } from './card';
import { HandType } from './enums/handType';

export class  Hand {
  cards: Card[];

  constructor(cards: Card[]) {
   this.cards = cards;
  }

  getHandScore() {
    let ans = 0;
    let cardCount: number[] = [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let card of this.cards) {
        cardCount[card.rank]++;
    }

    for (let index = 1; index < 15; index++) {
        ans += Math.pow(10, cardCount[index]) * index;
    }

   return ans;
}



compareTo(secondHand: Hand){
    return this.getHandScore() - secondHand.getHandScore();
}

}
