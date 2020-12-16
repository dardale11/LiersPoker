import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Card } from 'src/app/models/card';
import { Suite } from 'src/app/models/enums/suite';
import { Hand } from 'src/app/models/hand';

@Component({
  selector: 'app-choose-cards',
  templateUrl: './choose-cards.component.html',
  styleUrls: ['./choose-cards.component.scss']
})
export class ChooseCardsComponent implements OnInit {
  cardSymbolsIndices: number[];
  cards = [];
  hand: Hand;
  symbol: any = "";

  constructor() { }

  ngOnInit() {
    this.cardSymbolsIndices = [];
    for (let index = 2; index <= 13; index++) {
      this.cardSymbolsIndices.push(index);
    }
    this.cardSymbolsIndices.push(1);
  }

  getCardTitle(index: number) {
    switch (index) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return index;
    }
  }

  addCard(cardSymbolIndex) {
    if (this.cards.filter(val => val == cardSymbolIndex).length == 4){
       console.log("no more cards of this type left");
      return;
    }

    if (this.cards.length === 5) {
      console.log("cannot add more cards");
      return;
    }
    this.cards.push(cardSymbolIndex);
    this.updateCards();
  }

  removeCard(cardSymbolIndex) {
    this.cards.splice(this.cards.indexOf(cardSymbolIndex, 0), 1);
    this.updateCards()
  }

  updateCards() {
    this.cards = this.cards.sort((a, b) => a - b);
    this.hand = new Hand(this.numbersToCards(this.cards));
    this.cards = this.hand.getNumCards();

    console.log(this.hand.type)

  }

  numbersToCards(indices: any[]): Card[] {
    let cards: Card[] = [];
    indices.forEach(num => {
      cards.push(new Card(num, Suite.DIAMOND))
    });
    return cards;
  }


}
