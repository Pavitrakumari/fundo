import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _moment from 'moment';
import { MatSnackBarModule,
         MatToolbarModule, 
         MatSidenavModule, 
         MatListModule ,
         MatFormFieldModule,
         MatInputModule,
         MatAutocompleteModule,
         MatCheckboxModule,
         MatCardModule,
         MatDatepickerModule,
         MatRadioModule,
         MatSelectModule,
         MatSliderModule,
         MatSlideToggleModule,
         MatIconModule,
         MatNativeDateModule,
         MatButtonModule,
         MatTooltipModule,
         MatMenuModule,
         MatDialogModule,
         MatChipsModule,
         NativeDateModule,} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
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
import { AddlabelComponent } from './components/addlabel/addlabel.component';
import { SearchPipe } from '../app/core/pipes/search.pipe';
import { SearchComponent } from './components/search/search.component';
import { DataService } from '../app/core/services/data/data.service';
import { LoggerService} from '../app/core/services/logger/logger.service';
import { LabelsComponent } from './components/labels/labels.component';
import { DeleteComponent } from './components/delete/delete.component';
import { Icon1Component } from './components/icon1/icon1.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropImageComponent } from './components/cropimage/cropimage.component';
import { PinComponent } from './components/pin/pin.component';
import { MessagingService } from './core/services/messaging/messaging.service';
import { InterceptorService} from './core/services/interceptor/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsHandler } from './core/services/errorhandler/errorshandler';
import { DialogcollaboratorComponent } from './components/dialogcollaborator/dialogcollaborator.component';
import { InternetLostComponent } from './components/internet-lost/internet-lost.component';
import { QuestionAnswersComponent } from './components/question-answers/question-answers.component';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  declarations: [
         AppComponent, 
         SignupComponent, 
         LoginComponent, 
         ForgotpasswordComponent, 
         HomeComponent, 
         ToolbarComponent,
         NotesComponent,
         CreatenewlabelComponent, 
         ArchiveComponent, 
         TrashComponent, 
         SettingsComponent,
         RemindersComponent,
         FeedbackComponent,
         HelpComponent,
         AppdownloadsComponent,
         KeyboardshortcutsComponent,
         Icon1Component,
         CollaboratoriconComponent,
         ColoriconComponent,
         ImageiconComponent, 
         ArchiveiconComponent, 
         MoreiconComponent, 
         UndoiconComponent, 
         RedoiconComponent,
         NotescardComponent, 
         NotesparentComponent, 
         DialogComponent, 
         AddlabelComponent, 
         SearchPipe, 
         SearchComponent, 
         LabelsComponent,
         DeleteComponent,
         CropImageComponent,
         PinComponent,
         DialogcollaboratorComponent,
         InternetLostComponent,
         QuestionAnswersComponent,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BarRatingModule,
         MatDatepickerModule,
         NativeDateModule,
         ImageCropperModule,
         BrowserModule,
         AppRoutingModule,
         BrowserAnimationsModule,
         MatFormFieldModule,
         MatInputModule, 
         MatAutocompleteModule, 
         MatCheckboxModule, 
         MatDatepickerModule,
         MatRadioModule,
         MatSelectModule, 
         MatMenuModule, 
         MatSliderModule,
         FormsModule,
         MatSlideToggleModule, 
         MatCardModule, 
         HttpClientModule, 
         FormsModule, 
         MatSnackBarModule,
         ReactiveFormsModule, 
         FlexLayoutModule, 
         MatIconModule, 
         MatButtonModule, 
         MatTooltipModule,
         LayoutModule, 
         MatNativeDateModule,
         MatToolbarModule,
         MatSidenavModule, 
         MatListModule, 
         MatDialogModule, 
         MatChipsModule,
         HttpClientModule
  ],
  providers: [
    DataService,
    LoggerService,
    MessagingService,InterceptorService,{
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }
  ],
  entryComponents: [
      DialogComponent,
      CropImageComponent,
      ToolbarComponent, 
      DeleteComponent, 
      AddlabelComponent, 
      CreatenewlabelComponent,
      DialogcollaboratorComponent
   ],
    bootstrap: [AppComponent]
})
export class AppModule { }
export class TooltipCustomClassExample { }
