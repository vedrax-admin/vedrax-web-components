import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';
import { DescriptorPage } from '../../descriptor/descriptor-page';
import { DescriptorTable } from '../../descriptor/descriptor-table';
import { NVP } from '../../shared/nvp';

/**
 * Class that implements the {@link DataSource}.
 */
export class VedraxTableDataSource extends DataSource<any[]>{

    private subscription: Subscription = new Subscription();
    private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private totalItemsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private submittedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public totalItems$ = this.totalItemsSubject.asObservable();
    public submitted$ = this.submittedSubject.asObservable();

    get data(): any[] {
        return this.dataSubject.value;
    }

    constructor(private apiService: VedraxApiService, private descriptorTable: DescriptorTable) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.submittedSubject.complete();
        this.totalItemsSubject.complete();
        this.subscription.unsubscribe();
    }

    loadWithPagination(endpoint: string, params?: HttpParams) {
        this.submittedSubject.next(true);

        this.subscription.add(
            this.apiService.get<DescriptorPage>(endpoint, params)
                .pipe(
                    catchError(() => of(new DescriptorPage())),
                    finalize(() => this.submittedSubject.next(false))
                )
                .subscribe(page => {
                    this.addItems(page.content);
                    this.totalItemsSubject.next(page.totalElements);
                }));
    }

    load(endpoint: string, params?: HttpParams) {
        this.submittedSubject.next(true);

        this.subscription.add(
            this.apiService.get<any[]>(endpoint, params)
                .pipe(
                    catchError(() => of([])),
                    finalize(() => this.submittedSubject.next(false))
                )
                .subscribe(list => {
                    this.addItems(list);
                }));

    }

    /**
     * Method for adding an item
     * @param item 
     */
    addItem(item: any) {
        if (item && item.id) {
            this.transformItemWithMapping(item);
            this.dataSubject.next([...this.data, item]);
        }
    }

    /**
     * Method for adding items
     * @param items 
     */
    addItems(items: any[] = []) {
        this.transformItemsWithMapping(items);
        this.dataSubject.next(items);
    }

    /**
     * Transform when boolean
     * @param items 
     */
    private transformItemsWithMapping(items: any[] = []) {

        this.descriptorTable.columns
            .filter(column => column.mapping)
            .forEach(column => {
                items.map(item => {
                    const key: string = String(item[column.id]);//in case of boolean
                    item[column.id] = this.findValueMapping(column.mapping, key);
                })
            });

    }

    /**
     * Transform when boolean
     * @param items 
     */
    private transformItemWithMapping(item: any) {

        this.descriptorTable.columns
            .filter(column => column.mapping)
            .forEach(column => {
                const key: string = String(item[column.id]);//in case of boolean
                item[column.id] = this.findValueMapping(column.mapping, key);
            });

    }

    private findValueMapping(mapping: NVP[] = [], key: string): string {
        const element: NVP = mapping.find(element => element.key === key);
        return element ? String(element.value) : '';
    }

    /**
     * Transform when boolean
     * @param items 
     */
    private transformItems(items: any[] = []) {

        this.descriptorTable.columns
            .filter(column => column.withBool)
            .forEach(column => {
                items.map(item => {
                    const state: boolean = item[column.id];
                    item[column.id] = state ? column.valueWhenTrue : column.valueWhenFalse;
                })
            });

    }

    /**
     * Transform when boolean
     * @param items 
     */
    private transformItem(item: any) {

        this.descriptorTable.columns
            .filter(column => column.withBool)
            .forEach(column => {
                const state: boolean = item[column.id];
                item[column.id] = state ? column.valueWhenTrue : column.valueWhenFalse;
            });

    }



    /**
    * Method for updating a specific item
    * @param item the item to be updated
    */
    updateItem(item: any = {}) {
        const idx = this.data.findIndex(x => x.id === item.id);
        this.transformItemWithMapping(item);
        Object.assign(this.data[idx], item);
    }

}