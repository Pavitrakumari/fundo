import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PackdetailsComponent } from '../packdetails/packdetails.component';
import { UserService } from '../../core/services/http/user/user.service';
import { Notes } from '../../core/models/notes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  list:Notes[]=[]

  constructor(public dialog: MatDialog,private userService:UserService) { }
  public selectedBefore=false;
  public array=[];
  service;
  private cards=[];
  ngOnInit() {
    // this.array.push({index:1,select:false})
    // this.array.push({ index: 2, select: false })
    let obs = this.userService.getDataService1();
    obs
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      console.log("success in cart getcards()",response);
      this.list = response["data"].data;
      for (let i = 0; i <this.list .length; i++) {
        this.cards.push(this.list [i]);
      }
    })
  
  }
  respond(cards) {
    this.service = cards.name;
    cards.select = true;
    for (let i = 0; i < this.cards.length; i++) {
      if (cards.name == this.cards[i].name) {
        continue;
      }
      this.cards[i].select = false;
    }
  }
  clicked(card){
    if(card.select==true){
      this.selectedBefore=true;
      return;
    }
    card.select = true;
    for (let i = 0; i < this.array.length; i++) {
      if (card.index == this.array[i].index) {
        continue;
      }
      this.array[i].select = false;
    }

}
open(cardData){
  if(this.selectedBefore==true){
    console.log("open the dialog");
    const dialogRef = this.dialog.open(PackdetailsComponent, {
      width: "500px",
      maxWidth: 'auto',
      height:'auto',
      panelClass: 'myapp-no-padding-dialog' ,
data:cardData
      
    });
    dialogRef.afterClosed().subscribe(result => {

      
    });
  }


}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}

}