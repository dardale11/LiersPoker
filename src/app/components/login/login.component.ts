import { Component, OnInit } from '@angular/core';
import {LoginParameters} from "../../models/LoginParametrs";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  loginName = ""
  roomNumber = 0
  ngOnInit() {
  }

 onClickLogin(){
    console.log(`nitz :login name: ${this.loginName} roomNumber: ${this.roomNumber}`);
    const loginParameters = new LoginParameters(this.loginName,this.roomNumber);
   this.loginService.Login(loginParameters);
  }
}
