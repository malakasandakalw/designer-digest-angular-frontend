import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerService } from 'src/services/api/file-manager.service';

export interface UploadResponse {
  progress: number;
  files: []
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  upload: UploadResponse = { progress: 0, files: [] }
  isActive = false

  constructor(
    private fileManagerService: FileManagerService
  ) { }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      // this.onDroppedFile(droppedFiles)
    }
    this.isActive = false
  }

  files: { name: string, data: string }[] = []
  uploadedFiles: string[] = []

  onSelectFiles(event: any) {
    const selectedFiles: File[] = Array.from(event.target.files as FileList);

    const fileReaders = selectedFiles.map((file, index) => {
      return new Promise<any>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          resolve(
            this.files.push({
              name: file.name,
              data: e.target.result
            })
          )
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    })
    Promise.all(fileReaders).then(() => {
        this.onDroppedFile()
      }
    ).catch((error) => console.log('Error files reading', error))

    // selectedFiles.forEach(file => {
    //   const reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     this.files.push({
    //       name: file.name,
    //       data: e.target.result
    //     })
    //   };
    //   reader.readAsDataURL(file);
    // });
    // this.onDroppedFile()
  }

  async onDroppedFile() {

    if (this.files.length > 0) {

      await this.fileManagerService.uploadFiles(this.files)

    }
    // let formData = new FormData()

    // console.log(droppedFiles)

    // for (let i = 0; i < droppedFiles.length; i++) {
    //   console.log(i)
    //   formData.append(droppedFiles[i].name, droppedFiles[i])
    // }

    // console.log(formData)
    // this.fileManagerService.uploadFiles(droppedFiles[0]).subscribe((event: any) => {
    //   if (event.status === 'progress') {
    //     this.upload.progress = event.message;
    //   } else if (event.status === 'completed') {
    // this.upload.files.push({ file: File.name, status: 'Upload complete' });
    // this.upload.progress = 0;
    //   }
    // });

  }

}
