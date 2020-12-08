import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-cards',
  templateUrl: './choose-cards.component.html',
  styleUrls: ['./choose-cards.component.scss']
})
export class ChooseCardsComponent implements OnInit {
  cardSymbolsIndices: number[];

  constructor() { }

  ngOnInit() {
    this.cardSymbolsIndices = [];
    for (let index = 1; index <= 13; index++) {
      this.cardSymbolsIndices.push(index);
    }
  }

  symbolClick(cardSymbolIndex) {
  }


}
