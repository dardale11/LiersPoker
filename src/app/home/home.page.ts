import { Component, OnInit } from '@angular/core';
import { Card } from '../model/Card';
import { Hand, HandType } from '../model/Hand';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    let cards1 : Card[] = [];
    cards1.push(new Card(1, 'heart'));
    cards1.push(new Card(1, 'heart'));
    cards1.push(new Card(2, 'heart'));
    cards1.push(new Card(2, 'heart'));
    cards1.push(new Card(3, 'heart'));
    let hand1 = new Hand(cards1);
    let cards2 : Card[] = [];
    cards2.push(new Card(1, 'heart'));
    cards2.push(new Card(1, 'heart'));
    cards2.push(new Card(2, 'heart'));
    cards2.push(new Card(2, 'heart'));
    // cards2.push(new Card(3, 'heart'));
    let hand2 = new Hand(cards2);
    console.log(hand1.compareTo(hand2));
  }

}
