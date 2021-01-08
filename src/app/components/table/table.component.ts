import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ChooseCardsComponent } from '../choose-cards/choose-cards.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  showChooseCards = false;
  players =  [1,2,3,4,5,6,7,8];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openChooseCards() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = "backdropBackground";
    const dialogRef = this.dialog.open(ChooseCardsComponent,
    {
      width: '33%',
      position: {top: '0%', left:'0%'},
      backdropClass: 'backdropBackground'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

  // toggleChooseCards() {
  //   this.showChooseCards = !this.showChooseCards
  // }



}
