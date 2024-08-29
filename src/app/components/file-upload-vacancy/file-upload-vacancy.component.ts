import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadResponse } from '../file-upload/file-upload.component';
import { FileManagerService } from 'src/services/api/file-manager.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { createMessage } from 'src/app/common/utils/messages';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UploadedVacancyFile } from 'src/app/secured/employer/create-vacancy/create-vacancy.component';

@Component({
  selector: 'app-file-upload-vacancy',
  standalone: true,
  imports: [CommonModule,NzIconModule, NzButtonModule],
  templateUrl: './file-upload-vacancy.component.html',
  styleUrls: ['./file-upload-vacancy.component.css']
})
export class FileUploadVacancyComponent {
  @Output() progressUpdate = new EventEmitter<boolean>();
  @Output() uploadComplete = new EventEmitter<UploadedVacancyFile>();
  @Output() uploadError = new EventEmitter<string>();

  upload: UploadResponse = { progress: 0, files: [] }
  files: { name: string, data: string } | null = null
  uploadedFile: string | null = null
  isActive = false
  uploading = false

  constructor(
    private fileManagerService: FileManagerService,
    private message: NzMessageService,
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
    let droppedFiles = [event.dataTransfer.files[0]]
    if (droppedFiles) {
      const filesArray = Array.from(droppedFiles) as File[];
      console.log(filesArray)
      if (filesArray.length > 0) {
        this.onSelectFiles(filesArray);
      } else {
        createMessage(this.message, 'error', 'Error file uploading.')
      }
    }
    this.isActive = false
  }
  
  onSelecttoUpload(event: any) {
    const selectedFiles: File[] = Array.from([event.target.files[0]]);
    this.onSelectFiles(selectedFiles)
  }

  
  onSelectFiles(selectedFiles: File[]) {
    const fileReaders = selectedFiles.map((file, index) => {
      return new Promise<any>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          resolve(
            this.files = {
              name: file.name,
              data: e.target.result
            }
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
  }

  async onDroppedFile() {
    if (this.files) {
      try {
        this.uploading = true
        this.progressUpdate.emit(true);
        const response = await this.fileManagerService.uploadFile(this.files)
        this.uploadComplete.emit(response.body.file);
        this.progressUpdate.emit(false);
        this.files = null
        this.uploading = false
      } catch (error) {
        this.uploadError.emit('Upload failed');
      }
    }
  }

}
