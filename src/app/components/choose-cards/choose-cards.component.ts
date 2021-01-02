import { Component, OnInit, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Card } from 'src/app/models/card';
import { Hand } from 'src/app/models/hand';
import { Deck } from 'src/app/models/deck';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/models/player';
import { Tryout } from 'src/app/models/tryout';

@Component({
  selector: 'app-choose-cards',
  templateUrl: './choose-cards.component.html',
  styleUrls: ['./choose-cards.component.scss']
})
export class ChooseCardsComponent implements OnInit {
  @Input() player: Player = new Player();
  @Input() prevCards : Card[];
  prevHand: Hand;
  cardSymbolsIndices: number[];
  deck: Deck;
  cards: Card[];
  hand: Hand;
  symbol: any = "";

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    if (!this.prevCards) {
      this.prevCards = [];
      this.prevCards.push(new Card(2, "H"));
      this.prevCards.push(new Card(2, "C"));
      this.prevCards.push(new Card(2, "S"));
      this.prevCards.push(new Card(3, "H"));
      this.prevCards.push(new Card(3, "D"));
    }
    this.prevHand = new Hand(this.prevCards)
    this.deck = new Deck();
    this.cards = [];
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

  addCard(rank) {
    if (!this.deck.isCardByRank(rank)){
       console.log("no more cards of this type left");
      return;
    }
    if (this.cards.length === this.player.cardsNumber || this.cards.length === 5) {
      console.log("cannot add more cards");
      return;
    }
    this.cards.push(this.deck.popCardByRank(rank));
    this.updateCards();
  }

  removeCard(card: Card) {
    const index = this.cards.indexOf(card, 0);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
    this.deck.pushCard(card);
    this.updateCards()
  }

  updateCards() {
    this.cards = this.cards.sort((a, b) => a.rank - b.rank);
    this.hand = new Hand(this.cards);
    let pokerRankedNums = this.hand.getNumCards();
    let tempCards: Card[] = [];
    for (let index of pokerRankedNums) {
      let card = this.cards.find( card => card.rank == index);
      if (card) {
        tempCards.push(card);
        const index = this.cards.indexOf(card, 0);
        this.cards.splice(index, 1);
      }
    }
    this.cards = tempCards;
    // console.log(this.hand.type)

  }

  serve() {
    if (this.prevHand && this.hand.compareTo(this.prevHand) <= 0){
      console.log("please raise higher hand!")
      return;
    }
    console.log(this.cards);
    let tryout: Tryout = new Tryout();
    tryout.cards = this.cards;
    this.playerService.raiseHand(tryout);
  }
}
