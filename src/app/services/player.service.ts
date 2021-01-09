import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hand } from '../models/hand';

@Injectable()
export class PlayerService {
  apiUrl: string = "http://localhost:8080/player";

  constructor(private http: HttpClient) { }

  raiseHand(hand: Hand) {
    this.http.post(this.apiUrl + "/raise", JSON.stringify(hand)).subscribe(ans => console.log(ans));
  }
}
