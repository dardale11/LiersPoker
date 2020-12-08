import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hand } from '../models/hand';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl: string;

  constructor(private httpService: HttpService) { }

  raiseHand(playerId: number, hand :Hand): Observable<any> {
    return this.httpService.post<any[]>(this.apiUrl + '/raise/' + playerId, hand);
  }
}
