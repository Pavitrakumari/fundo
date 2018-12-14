/************************************************************************************************
*  Execution       :   1. default node         cmd> advancepackdetails.ts 
*        
*  Purpose         : To design the shopping cart
* 
*  Description    
* 
*  @file           : advancepackdetails.ts
*  @overview       : To design the shopping cart
*  @module         : advancepackdetails.ts - This is optional if expeclictly it's an npm or local package
*  @author         : Pavitrakumari <pavithra.korapati@gmail.com>
*  @since          : 02-12-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../core/services/http/user/user.service';
import { Notes } from '../../core/models/notes';
import { CartService } from '../../core/services/http/cart/cart.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-advancepackdetails',
  templateUrl: './advancepackdetails.component.html',
  styleUrls: ['./advancepackdetails.component.scss']
})
export class AdvancepackdetailsComponent implements OnInit {
  public value = 25;

 public  open=false;
 public show=false;
 public signin=true;
 check=true;
 public cssSign;
  snackBar: any;
 
  constructor(public router: Router,private _formBuilder: FormBuilder,private cartService:CartService) { }
  private cards=[];

  ngOnInit() {
    this.getCartDetails();
  
  }
  // private product=localStorage.getItem('productId')

  public body;
  public content;
  public name;
  public price;
  public desc;
public productId;
private product=localStorage.getItem('productId')
myCart(){
  
}
  getCartDetails(){
    this.cartService.myCart()
    .subscribe(response=>{
      console.log("success in getcartdetails",response);
      
    // this.product=response['data']['product']['id']
    this.name=response['data']['product']['name']
    this.price=response['data']['product']['price']
    this.desc=response['data']['product']['description']
    }),
    error=>{
      console.log("error in getcart details",error);
      
    }
    
    }
    proceedToCheckOut(){
      this.open=true;
      this.value=50;
      this.cssSign=true;
      this.signin=false;
    }
    fundooNotes(){
      this.router.navigate(['home/notes']);

    }
    placeOrder(address){
      if(address!=undefined){
      this.body={"cartId":this.product,
                  "address":address}
                  this.cartService.placeOrder(this.body)
                  .subscribe(response=>{
                    console.log("success in place order",response);
                    this.show=true;
                    this.cssSign = false;
                    this.value=100;
                    
                    }),
                    error=>{
                      console.log("error in place order",error);
                      
                    }
                    
    }
    else{
      this.snackBar.open("Enter Delivery Address ", "Address", {
        duration: 10000,
    });
    }
    }
        
  

}
