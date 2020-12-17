import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'metrolab-vedrax-confirm',
  templateUrl: './vedrax-confirm.component.html'
})
export class VedraxConfirmComponent implements OnInit {

  title: string;
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    public dialogRef: MatDialogRef<VedraxConfirmComponent>) { }

  ngOnInit(): void {
    this.title = this.data['title'];
    this.message = this.data['message'];
  }

}
