import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

import { VedraxApiService } from './vedrax-api.service';
import { DescriptorTable, DescriptorPage } from '../descriptor';
import { Validate } from '../util/validate';

@Injectable({ providedIn: 'root' })
export class VedraxDataService {

    constructor(private apiService: VedraxApiService) { }

    dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    /**
    * The total number of elements
    */
    totalElements: number = 0;

    /**
    * The list of subscription
    */
    private subscription: Subscription = new Subscription();

    /**
     * Get list of data as an array
     */
    get data(): any[] {
        return this.dataSubject.value;
    }

    /**
     * Get list of data as an Observable
     */
    get dataAsObservable(): Observable<any[]> {
        return this.dataSubject.asObservable();
    }

    /**
     * Method for avoiding memory leak
     */
    complete() {
        this.dataSubject.complete();
        this.subscription.unsubscribe();
    }

    /**
     * Method for loading data
     * @param descriptor the table descriptor
     * @param params the API parameters
     */
    load(descriptor: DescriptorTable, params?: HttpParams): void {
        Validate.isNotNull(descriptor, 'Descriptor for table must be provided');

        this.subscription.add(
            this.apiService.get<DescriptorPage>(descriptor.path, params)
                .pipe(
                    catchError(() => of(new DescriptorPage()))
                )
                .subscribe((page: DescriptorPage) => {
                    this.addItems(page.content);
                    this.totalElements = page.totalElements;
                }));
    }

    /**
     * Method for loading simple list of objects
     * @param descriptor the table descriptor
     */
    loadValues(descriptor: DescriptorTable, params?: HttpParams): void {
        Validate.isNotNull(descriptor, 'Descriptor for table must be provided');

        this.subscription.add(
            this.apiService.get<any[]>(descriptor.path, params)
                .pipe(
                    catchError(() => of([]))
                )
                .subscribe((list: any[]) => {
                    this.addItems(list);
                    this.totalElements = list.length;
                }));
    }

    /**
     * Method for adding an item
     * @param item the item to be added
     */
    addItem(item: any): void {
        if (item) {
            this.dataSubject.next([item, ...this.data]);
        }
    }

    /**
     * Method for adding a list of items
     * @param items the list of items to be added
     */
    addItems(items: any[] = []): void {
        this.dataSubject.next(items);
    }

    /**
     * Method for updating a specific item
     * @param item the item to be updated
     */
    updateItem(item: any) {
        if (item) {
            let idx = this.data.findIndex(x => x.id == item.id);
            Object.assign(this.data[idx], item);
        }
    }

}