import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css']
})
/** delete-dialog component*/
export class DeleteDialogComponent {
  /** delete-dialog ctor */

  data: string;
  constructor(private http: HttpClient, private dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  confirm() {
    this.dialogRef.close("ok");
  }

  close() {
    this.dialogRef.close();
  }
}
