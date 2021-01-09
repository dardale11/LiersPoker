import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginParameters} from "../models/LoginParametrs";
import {environment} from "../../environments/environment.prod";

@Injectable()
export class LoginService {

  loginUrl = environment.ServerIP+"/login"
  constructor(private http: HttpClient) { }


  Login(loginParameters: LoginParameters) {
    console.log(`nitz loginParameters: ${JSON.stringify(loginParameters)}`)
    this.http.post(this.loginUrl, loginParameters).subscribe(ans => console.log(JSON.stringify(ans)));
  }
}
