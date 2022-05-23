import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponseModelv3 } from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient, private authService: AuthService) {}

  logindata;
  ngOnInit() {
    this.logindata = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
  }
  selectedFile;

  public uploadFile = (files) => {
    this.message = '';
    this.progress = 0;
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    var ext = fileToUpload.name.split('.').pop();
    const formData = new FormData();
    formData.append(
      'myfile',
      fileToUpload,
      this.logindata.doctorCode + '.' + ext
    );

    this.http
      .post('http://10.151.12.120:7229/api/Upload/ProfilePic', formData, {
        headers: {},
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        (error) => {
          console.log(error);
        },
        () => {}
      );
  };
}
