import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { VedraxTableComponent } from '../../vedrax-table/vedrax-table.component';
import { VedraxModalComponent } from '../../vedrax-modal/vedrax-modal.component';
import { VedraxBaseComponent } from '../../shared/vedrax-base.component';

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
   * The value of the given attributes
   */
  displayValue: string;

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
    const dialogRef = this.dialog.open(VedraxModalComponent, {
      width: '600px',
      data: {
        title: this.descriptor.controlLabel,
        component: VedraxTableComponent,
        inputs: {
          descriptor: this.descriptor.controlSearch
        }
      }
    });

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
          //set display value only
          this.displayValue = data[this.descriptor.controlDisplayKey];
        }
      }));
  }

  ngOnInit(): void {
    this.displayValue = this.descriptor.controlDisplayValue;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
