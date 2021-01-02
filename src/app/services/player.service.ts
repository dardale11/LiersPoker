import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tryout } from '../models/tryout';

@Injectable()
export class PlayerService {
  apiUrl: string = "http://localhost:8080/player";

  constructor(private http: HttpClient) { }

  raiseHand(cards : Tryout) {
    console.log(JSON.stringify(cards))
    this.http.post(this.apiUrl + "/raise", cards).subscribe(ans => console.log(ans));
  }
}
