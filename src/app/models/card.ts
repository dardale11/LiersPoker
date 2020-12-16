import { Suite } from './enums/suite';

export class Card {
  rank: number;
  suite: Suite;

  constructor(rank: number, suite: Suite) {
    this.rank = rank;
    this.suite = suite;
  }

}
