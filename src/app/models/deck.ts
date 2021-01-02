import { Card } from './card';

export class Deck {
  cardsCount: Array<any[]> = [];
  SuiteRaw = ['H', 'S', 'D', 'C'];

  constructor() {
    for (let rank = 1; rank <= 13; rank++) {
      this.cardsCount[rank] = [];
      for (let suite of this.SuiteRaw){
          this.cardsCount[rank].push(suite)
      }
    }
  }

  isCardByRank(rank) {
    return !(this.cardsCount[rank].length === 0);
  }

  popCardByRank(rank) {
    return new Card(rank, this.cardsCount[rank].pop());
  }

  pushCard(card: Card) {
    this.cardsCount[card.rank].push(card.suite);
  }
}
