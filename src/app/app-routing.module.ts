import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';




import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';

import { CreatenewlabelComponent } from './components/createnewlabel/createnewlabel.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HelpComponent } from './components/help/help.component';
import { AppdownloadsComponent } from './components/appdownloads/appdownloads.component';
import { KeyboardshortcutsComponent } from './components/keyboardshortcuts/keyboardshortcuts.component';
import { AuthGuard as AuthGuard } from '../app/auth/auth.guard';



const appRoutes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  /**{path:'resetpassword/:id',component:ResetpasswordComponent},*/
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'notes1',pathMatch:'full'},
    {path:'notes1',component:NotesComponent,},
    {path:'reminders',component:RemindersComponent},
    {path:'newlabel',component:CreatenewlabelComponent},
    {
      path:'archive',component:ArchiveComponent
    },
    {
      path:'trash',component:TrashComponent
    },
    {
      path:'settings',component:SettingsComponent
    },
    {
      path:'sendfeedback',component:FeedbackComponent
    },
    {
      path:'help',component:HelpComponent
    },
    {
      path:'appdownloads',component:AppdownloadsComponent
    },
 
    {
      path:'keyboardshortcuts',component:KeyboardshortcutsComponent
    },
 
 
 
 
 
 
  ]},

  
  {path:'',redirectTo:'/login',pathMatch:'full'}


];







@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
 // declarations: []
 exports:[RouterModule]
})

export class AppRoutingModule { }
