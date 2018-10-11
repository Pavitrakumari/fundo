import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';



const appRoutes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},

  {path:'',redirectTo:'/login',pathMatch:'full'}


];







@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
 // declarations: []
 exports:[RouterModule]
})

export class AppRoutingModule { }
