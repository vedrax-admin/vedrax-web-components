import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { VedraxModalComponent } from '../../vedrax-modal/vedrax-modal.component';
import { VedraxBaseComponent } from '../../shared/vedrax-base.component';
import { VedraxTableComponent } from '../../data-table/vedrax-table/vedrax-table.component';
import { VedraxSearchTableComponent } from '../vedrax-search-table/vedrax-search-table.component';

/**
 * Class that defines a search component where 
 * we can get an ID via a {@link VedraxTableComponent} embedded in a modal.
 * The search component display the given associated attributes.
 */
@Component({
  selector: 'vedrax-search',
  templateUrl: './vedrax-search.component.html'
})
export class VedraxSearchComponent extends VedraxBaseComponent
  implements OnInit, OnDestroy {

  /**
   * List of subscriptions
   */
  private subscription: Subscription = new Subscription();

  constructor(public dialog: MatDialog) {
    super();
  }

  /**
   * Open a dialog with the embedded search table
   */
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '600px';
    dialogConfig.data = {
      title: this.descriptor.controlLabel,
      descriptor: this.descriptor
    };

    const dialogRef = this.dialog.open(VedraxSearchTableComponent, dialogConfig);

    this.onClose(dialogRef);
  }

  /**
   * Helper method for listening when dialog is closed
   * @param dialogRef 
   */
  private onClose(dialogRef): void {
    this.subscription.add(dialogRef.afterClosed()
      .subscribe(result => {
        if (result && result.data) {
          //output in table is of format {action, item}
          const data = result.data.item;
          //set control with ID per default
          this.control.setValue(data['id']);
        }
      }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
