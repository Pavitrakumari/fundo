import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../core/services/http/user/user.service';
import { Notes } from '../../core/models/notes';
import { CartService } from '../../core/services/http/cart/cart.service';

@Component({
  selector: 'app-advancepackdetails',
  templateUrl: './advancepackdetails.component.html',
  styleUrls: ['./advancepackdetails.component.scss']
})
export class AdvancepackdetailsComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  list:Notes[]=[]
  private price: any;
  private desc: any;
 private name: any;
  productId1: any;

  constructor(private _formBuilder: FormBuilder,private cartService:CartService) { }
  private cards=[];

  ngOnInit() {
    this.getCartDetails();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });




  
  }
  private product=localStorage.getItem('productId')
  getCartDetails(){
    this.cartService.cartDetails(this.product).subscribe(response=>{
    console.log('cartDetails',response);
    this.productId1=response['data']['product']['id']
    console.log("productid",this.productId1);
    this.price=response['data']['product']['price']
    this.desc=response['data']['product']['description']
    this.name=response['data']['product']['name']
  });
    
    }
  
  

}
