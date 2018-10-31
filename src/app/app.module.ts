import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBarModule, MatToolbarModule, MatSidenavModule, MatListModule } from "@angular/material";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule }    from '@angular/common/http';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
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
import { Icon1Component } from './components/icon1/icon1.component';
import { CollaboratoriconComponent } from './components/collaboratoricon/collaboratoricon.component';
import { ColoriconComponent } from './components/coloricon/coloricon.component';
import { ImageiconComponent } from './components/imageicon/imageicon.component';
import { ArchiveiconComponent } from './components/archiveicon/archiveicon.component';
import { MoreiconComponent } from './components/moreicon/moreicon.component';
import { UndoiconComponent } from './components/undoicon/undoicon.component';
import { RedoiconComponent } from './components/redoicon/redoicon.component';
import { NotescardComponent } from './components/notescard/notescard.component';
import { NotesparentComponent } from './components/notesparent/notesparent.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material';
import { AddlabelComponent } from './components/addlabel/addlabel.component';
import {MatChipsModule} from '@angular/material/chips';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,SignupComponent,LoginComponent,ForgotpasswordComponent,HomeComponent,ToolbarComponent,
    NotesComponent,CreatenewlabelComponent, ArchiveComponent,TrashComponent, SettingsComponent,RemindersComponent,
    FeedbackComponent,HelpComponent,AppdownloadsComponent,KeyboardshortcutsComponent,Icon1Component,CollaboratoriconComponent,
    ColoriconComponent,ImageiconComponent,ArchiveiconComponent,MoreiconComponent,UndoiconComponent,RedoiconComponent,
    NotescardComponent,NotesparentComponent, DialogComponent,AddlabelComponent, SearchPipe,
],
imports: [
    BrowserModule,AppRoutingModule,BrowserAnimationsModule,MatFormFieldModule,
    MatInputModule,MatAutocompleteModule,MatCheckboxModule,MatDatepickerModule,
    MatRadioModule,MatSelectModule,MatMenuModule,MatSliderModule,
    MatSlideToggleModule,MatCardModule, HttpClientModule ,FormsModule,MatSnackBarModule,
    ReactiveFormsModule,FlexLayoutModule,MatIconModule,MatButtonModule,MatTooltipModule,
    LayoutModule, MatToolbarModule, MatSidenavModule, MatListModule,MatDialogModule,MatChipsModule
  ],
    providers: [],
    entryComponents:[DialogComponent,AddlabelComponent,CreatenewlabelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class TooltipCustomClassExample {}
