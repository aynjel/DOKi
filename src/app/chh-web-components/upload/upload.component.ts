import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  selectedFile;

  public uploadFile = (files) => {
    console.log('first upload form');

    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('', fileToUpload, fileToUpload.name);

    this.http
      .post('http://10.151.12.120:7229/api/Upload/ProfilePic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
