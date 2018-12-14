import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { DialogData } from '../dialog/dialog.component';
import { CartService } from '../../core/services/http/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packdetails',
  templateUrl: './packdetails.component.html',
  styleUrls: ['./packdetails.component.scss']
})
export class PackdetailsComponent implements OnInit {
  content: { "productId": any; };

  constructor(public dialogRef: MatDialogRef<PackdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PackdetailsComponent,public router:Router,
  public   cartService:CartService) { 
    // dialogRef.disableClose = true
  }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close();
  }
  checkOut(){
    this.close();
 
    this.content={
      "productId":this.data['id']
    }
    this.cartService.addToCart(this.content).subscribe(response=>{
console.log(response);
localStorage.setItem('productId',response['data']['details']['id']);
console.log('productId',response['data']['details']['id']);

    });
    this.router.navigate(['/signup']);
  }


}
