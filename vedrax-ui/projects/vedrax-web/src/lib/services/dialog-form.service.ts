import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';

import { DescriptorForm } from '../descriptor/descriptor-form';
import { VedraxFormModalComponent } from '../form-controls/vedrax-form-modal/vedrax-form-modal.component';
import { Validate } from '../util/validate';
import { take, map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class DialogFormService {

    constructor(private dialog: MatDialog) { }

    open(descriptor: DescriptorForm): Observable<any> {
        Validate.isNotNull(descriptor, "descriptor must be provided");

        const dialogRef = this.dialog.open(VedraxFormModalComponent, {
            width: '600px',
            data: descriptor,
            disableClose: true
        });

        return dialogRef.afterClosed()
            .pipe(
                take(1),
                map(res => res)
            );
    }

}