import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, of } from 'rxjs';
import { catchError,finalize } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';
import { DescriptorPage } from '../../descriptor/descriptor-page';

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

    constructor(private apiService: VedraxApiService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.submittedSubject.complete();
        this.totalItemsSubject.complete();
    }

    loadWithPagination(endpoint: string, params?: HttpParams) {
        this.submittedSubject.next(true);

        this.subscription.add(
            this.apiService.get<DescriptorPage>(endpoint, params)
                .pipe(
                    catchError(() => of(new DescriptorPage())),
                    finalize(() => this.submittedSubject.next(true))
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
                    finalize(() => this.submittedSubject.next(true))
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
            this.dataSubject.next([...this.data, item]);
        }
    }

    /**
     * Method for adding items
     * @param items 
     */
    addItems(items: any[] = []) {
        this.dataSubject.next(items);
    }

    /**
    * Method for updating a specific item
    * @param item the item to be updated
    */
    updateItem(item: any = {}) {
        const idx = this.data.findIndex(x => x.id === item.id);
        Object.assign(this.data[idx], item);
    }

}