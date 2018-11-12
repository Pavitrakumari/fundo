// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-cropimage',
//   templateUrl: './cropimage.component.html',
//   styleUrls: ['./cropimage.component.css']
// })
// export class CropimageComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
// import { NavigationComponent } from '../navigation/navigation.component';
import { DataService } from '../../core/services/data/data.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
@Component({
    selector: 'app-cropimage',
    templateUrl: './cropimage.component.html',
    styleUrls: ['./cropimage.component.scss']
  })
  export class CropImageComponent implements OnInit {
  public croppedImage: ''


  constructor(
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

    var token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.httpService.imageupload('user/uploadProfileImage', uploadData, token).subscribe(res => {


      console.log(res);

      localStorage.setItem('imageUrl', res['status'].imageUrl);
      this.dialogRef1.close();
      this.service.changeProfile(true);
    }, error => {
      console.log(error);
    })

  }


}

