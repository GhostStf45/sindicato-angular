import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export var downloadArray = [];


@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  task: AngularFireUploadTask;
  percentage:Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  token: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.startUpload();
  }
  startUpload(){
    const path=`documentos/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        console.log(this.downloadURL);
        downloadArray.push({ downloadUrl: this.downloadURL, path});
        //this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),

    );

  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
