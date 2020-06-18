import { Component, OnInit, Inject } from '@angular/core';
import { Validate } from '../../util/validate';
import { DescriptorAction } from '../../descriptor/descriptor-action';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DescriptorTable } from '../../descriptor/descriptor-table';

class TableSelectionItem {
  action: DescriptorAction;
  item: any;
}

@Component({
  selector: 'vedrax-search-table',
  templateUrl: './vedrax-search-table.component.html'
})
export class VedraxSearchTableComponent implements OnInit {

  descriptor: DescriptorTable;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<VedraxSearchTableComponent>) {
    this.descriptor = data.descriptor;
    this.title = data.title;
  }

  ngOnInit(): void {
  }

  select(selection: TableSelectionItem): void {
    Validate.isNotNull(selection.action, 'action must be provided');
    Validate.isNotNull(selection.item, 'Item must be provided');

    this.dialogRef.close(selection);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
