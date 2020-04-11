import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';
import { DescriptorPage } from '../../descriptor/descriptor-page';

/**
 * Class that implements the {@link DataSource}.
 */
export class VedraxTableDataSource extends DataSource<any[]>{

    private subscription: Subscription = new Subscription();
    private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private totalItemsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    public totalItems$ = this.totalItemsSubject.asObservable();

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
        this.totalItemsSubject.complete();
    }

    loadWithPagination(endpoint: string, params?: HttpParams) {
        this.subscription.add(
            this.apiService.get<DescriptorPage>(endpoint, params)
                .pipe(
                    catchError(() => of(new DescriptorPage()))
                )
                .subscribe(page => {
                    this.addItems(page.content);
                    this.totalItemsSubject.next(page.totalElements);
                }));
    }

    load(endpoint: string, params?: HttpParams) {
        this.subscription.add(
            this.apiService.get<any[]>(endpoint, params)
                .pipe(
                    catchError(() => of([]))
                )
                .subscribe(list => this.addItems(list)));

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