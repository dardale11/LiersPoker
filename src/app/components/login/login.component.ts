import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  loginName = ""
  roomNumber = 0
  ngOnInit() {
  }

 onClickLogin(){
    console.log(`nitz :login name: ${this.loginName} roomNumber: ${this.roomNumber}`)

  }
}
