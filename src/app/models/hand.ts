import { Card } from './card';
import { HandType } from './enums/handType';

export class Hand {
  map: Map<HandType, number[]>;
  type: HandType;

  constructor(cards: Card[]) {
    this.map = new Map();
    this.setHandFromCards(cards);
    this.setHandType();
  }

  setHandFromCards(cards: Card[]) {
    let cardCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let card of cards) {
      cardCount[card.rank]++;
    }
    for (let index = 1; index < 14; index++) {
      let tempType: HandType;
      switch (cardCount[index]) {
        case 1:
          tempType = HandType.SINGLE;
          break;
        case 2:
          tempType = HandType.PAIR;
          break;
        case 3:
          tempType = HandType.TRIPLET;
          break;
        case 4:
          tempType = HandType.FOURET;
          break;
      }
      let tempList: number[] = [];
      if (this.map.has(tempType)) {
        tempList = this.map.get(tempType);
        tempList.push(index);
        tempList.sort((a, b) => b - a)
        this.map.set(tempType, tempList);
      } else {
        let tempList: number[] = [];
        tempList.push(index);
        tempList.sort((a, b) => b - a)
        this.map.set(tempType, tempList);
      }
    }
  }

  setHandType() {
    if (this.map.has(HandType.FOURET)) {
      this.type = HandType.FOURET;
      return;
    }
    if (this.map.has(HandType.TRIPLET) && this.map.has(HandType.PAIR)) {
      this.type = HandType.FULL_HOUSE;
      return;
    }
    if (this.map.has(HandType.TRIPLET)) {
      this.type = HandType.TRIPLET;
      return;
    }
    if (this.map.has(HandType.PAIR)) {
      this.type = HandType.TWO_PAIRS;
      return;
    }
    if (this.map.has(HandType.PAIR)) {
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
      return this.map.get(HandType.FOURET)[0] - hand.map.get(HandType.FOURET)[0];
    }

    if (this.type == HandType.FULL_HOUSE || this.type == HandType.TRIPLET) {
      return this.map.get(HandType.TRIPLET)[0] - hand.map.get(HandType.TRIPLET)[0];
    }

    if (this.type == HandType.TWO_PAIRS) {
      if (this.map.get(HandType.PAIR)[0] - hand.map.get(HandType.PAIR)[0] != 0) {
        return this.map.get(HandType.PAIR)[0] - hand.map.get(HandType.PAIR)[0];
      }
      if (this.map.get(HandType.PAIR)[1] - this.map.get(HandType.PAIR)[1] != 0) {
        return this.map.get(HandType.PAIR)[1] - this.map.get(HandType.PAIR)[1];
      }

      if (this.map.get(HandType.SINGLE).length > 0 && hand.map.get(HandType.SINGLE).length > 0) {
        return this.map.get(HandType.SINGLE)[0] - hand.map.get(HandType.SINGLE)[0];
      }

      if (this.map.get(HandType.SINGLE).length > 0 && hand.map.get(HandType.SINGLE).length == 0) {
        return 1;
      }

      if (this.map.get(HandType.SINGLE).length == 0 && hand.map.get(HandType.SINGLE).length > 0) {
        return -1;
      }

      return 0;
    }

    if (this.type == HandType.PAIR) {
      if (this.map.get(HandType.PAIR)[0] - hand.map.get(HandType.PAIR)[0] != 0) {
        return this.map.get(HandType.PAIR)[0] - hand.map.get(HandType.PAIR)[0];
      }
    }

    for (let index = 0; index < Math.min(this.map.get(HandType.SINGLE).length, hand.map.get(HandType.SINGLE).length); index++) {
      if (this.map.get(HandType.SINGLE)[index] != null && hand.map.get(HandType.SINGLE)[index] != null && this.map.get(HandType.SINGLE)[index] - hand.map.get(HandType.SINGLE)[index] != 0) {
        return this.map.get(HandType.SINGLE)[index] - hand.map.get(HandType.SINGLE)[index];
      }
      if (this.map.get(HandType.SINGLE)[index] != null && hand.map.get(HandType.SINGLE)[index] == null) {
        return 1;
      }
      if (this.map.get(HandType.SINGLE)[index] == null && hand.map.get(HandType.SINGLE)[index] != null) {
        return -1;
      }

    }
    return 0;
  }
}
