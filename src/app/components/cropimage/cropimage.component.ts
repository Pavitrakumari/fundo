
import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
// import { NavigationComponent } from '../navigation/navigation.component';
import { DataService } from '../../core/services/data/data.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { NoteService } from '../../core/services/http/note/note.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-cropimage',
    templateUrl: './cropimage.component.html',
    styleUrls: ['./cropimage.component.scss']
  })
  export class CropImageComponent implements OnInit,OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();

  public croppedImage: ''


  constructor(
    private noteService:NoteService,
    private dialogRef1: MatDialogRef<ToolbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private service: DataService
  ) { }

  ngOnInit() {
  }
  imageCropped(event: any) {
    this.croppedImage = event.file;
  }

  onUpload() {
try{
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.noteService.imageupload( uploadData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {



      localStorage.setItem('imageUrl', res['status'].imageUrl);
      this.dialogRef1.close();
      this.service.changeProfile(true);
    }, error => {
      LoggerService.log(error);
    })
  }
catch(error){
    LoggerService.log(error);
  }

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}

