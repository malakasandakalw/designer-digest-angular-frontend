import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerService } from 'src/services/api/file-manager.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { createMessage } from 'src/app/common/utils/messages';
import { NzButtonModule } from 'ng-zorro-antd/button';

export interface UploadResponse {
  progress: number;
  files: []
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule,NzButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  @Input({required: true}) multiple: boolean = false;
  @Input({required: true}) acceptBoth: boolean = true;
  @Output() progressUpdate = new EventEmitter<boolean>();
  @Output() uploadComplete = new EventEmitter<any[]>();
  @Output() uploadError = new EventEmitter<string>();
  
  upload: UploadResponse = { progress: 0, files: [] }
  files: { name: string, data: string }[] = []
  uploadedFiles: string[] = []
  isActive = false

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
    let droppedFiles = this.multiple ? event.dataTransfer.files : [event.dataTransfer.files[0]];
    if (droppedFiles) {
      const selectedFiles: File[] = this.acceptBoth ? Array.from(droppedFiles as FileList) : Array.from(droppedFiles.filter((file_: File) => {
        return file_.type.startsWith('image/');
      }));
      if (selectedFiles.length > 0) {
        this.onSelectFiles(selectedFiles);
      } else {
        createMessage(this.message, 'error', 'Please drop only image files.')
      }
    }
    this.isActive = false
  }

  onSelecttoUpload(event: any) {
    const selectedFiles: File[] = Array.from(this.multiple ? event.target.files as FileList : [event.target.files[0]]);
    this.onSelectFiles(selectedFiles)
  }

  onSelectFiles(selectedFiles: File[]) {
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
  }

  async onDroppedFile() {
    if (this.files.length > 0) {
      try {
        this.progressUpdate.emit(true);
        const response = await this.fileManagerService.uploadFiles(this.files)
        console.log(response)
        this.uploadComplete.emit(response.body.files);
        this.progressUpdate.emit(false);
        this.files = []
      } catch (error) {
        this.uploadError.emit('Upload failed');
      }
    }
  }
}
