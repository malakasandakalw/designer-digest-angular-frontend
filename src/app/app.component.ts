import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form!: FormGroup

  title = 'fileUpload';
  files : any[] = [];

  constructor(
    private http: HttpClient,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      files: [null, [Validators.required]],
    });
   }

  ngOnInit() {

  }

  selectMultipleImage(event: any) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;
    }
  }

  onMultipleSubmit() {
    const formData = new FormData();
    for (let img of this.files) {
      formData.append('files', img);
    }
    this.http.post<any>('http://localhost:3000/api/get-abuse-reports/upload', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
