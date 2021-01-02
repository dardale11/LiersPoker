export class Card {
  rank: number;
  suite: 'H' | 'S' | 'D' | 'C';
  img_path: String;

  constructor(rank: number, suite: 'H' | 'S' | 'D' | 'C') {
    this.rank = rank;
    this.suite = suite;
    let cardRankSymbol;
    switch (rank) {
      case 1:
        cardRankSymbol = 'A';
        break;
      case 11:
        cardRankSymbol = 'J';
        break;
      case 12:
        cardRankSymbol = 'Q';
        break;
      case 13:
        cardRankSymbol = 'K';
        break;
      default:
        cardRankSymbol = rank;
    }

    this.img_path = "assets/images/" + cardRankSymbol + suite + ".jpg";
    console.log(this.img_path);
  }

}
