import { Injectable } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { DescriptorAction } from '../descriptor/descriptor-action';
import { UrlService } from './url.service';
import { DescriptorModal } from '../descriptor/descriptor-modal';
import { DescriptorForm } from '../descriptor/descriptor-form';
import { VedraxApiService } from './vedrax-api.service';
import { VedraxFormModalComponent } from '../form-controls/vedrax-form-modal/vedrax-form-modal.component';
import { Validate } from '../util/validate';

export interface DataTableCallback {
    (item: any): void
}

@Injectable({
    providedIn: 'root'
})
export class DialogFormService {

    /**
    * The list of subscription
    */
    private subscription: Subscription = new Subscription();

    constructor(
        private dialog: MatDialog,
        private urlService: UrlService,
        private apiService: VedraxApiService) { }

    /**
    * Method for avoiding memory leak
    */
    complete() {
        this.subscription.unsubscribe();
    }

    openFormDialogFromApi(action: DescriptorAction, item: any, callback: DataTableCallback): void {
        Validate.isNotNull(action, 'action escriptor must be provided');
        Validate.isNotNull(item, 'item must be provided');
        Validate.isNotNull(callback, 'callback must be provided');

        let title = `${action.label} - ${item['id']}`;

        this.urlService.reset();//create empty array
        this.urlService.insertFragment(action.url);
        this.urlService.insertFragment(`${item['id']}`);
        this.urlService.insertFragment(action.fragment);

        this.subscription.add(
            this.apiService
                .get<DescriptorForm>(this.urlService.construct())
                .pipe(
                    catchError(() => of(new DescriptorForm()))
                )
                .subscribe(formDescriptor => {
                    if (formDescriptor) {
                        this.openDialog(new DescriptorModal(title, formDescriptor), callback);
                    }
                }));

    }

    /**
     * Method for opening a form dialog with the provided DescriptorForm returned from the API
     * @param action the action as create or edit
     * @param descriptor the provided Descriptor modal
     */
    private openDialog(descriptor: DescriptorModal, callback: DataTableCallback): void {
        const dialogRef = this.dialog.open(VedraxFormModalComponent, {
            width: '600px',
            data: descriptor
        });

        this.subscription.add(
            dialogRef.afterClosed().subscribe(vo => {
                callback(vo);
            }));

    }

}