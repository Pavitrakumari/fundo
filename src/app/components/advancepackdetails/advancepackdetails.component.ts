import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../core/services/http/user/user.service';
import { Notes } from '../../core/models/notes';

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

  constructor(private _formBuilder: FormBuilder,private userService:UserService) { }
  private cards=[];

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });



    let obs = this.userService.getDataService1();
    obs
    // .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      console.log("success in cart getcards()",response);
      this.list = response["data"].data;
      for (let i = 0; i <this.list .length; i++) {
        this.cards.push(this.list [i]);
      }
    })
  
  }

  

}
