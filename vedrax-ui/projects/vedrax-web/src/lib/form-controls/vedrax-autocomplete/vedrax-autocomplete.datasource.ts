import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';

/**
 * Class that implements the {@link DataSource}.
 */
export class VedraxAutocompleteDataSource extends DataSource<any[]>{

    private subscription: Subscription = new Subscription();
    private cachedData: any[] = [];
    private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private pageSize = 30;
    private lastPage = 0;
    private searchStr: string;

    constructor(private apiService: VedraxApiService,
        private endpoint: string) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        this.subscription.add(collectionViewer.viewChange.subscribe(range => {

            const currentPage = this.getPageForIndex(range.end);

            if (currentPage > this.lastPage) {
                this.lastPage = currentPage;

                this.load();
            }
            
        }));

        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.subscription.unsubscribe();
    }

    private getPageForIndex(i: number): number {
        return Math.floor(i / this.pageSize);
    }

    search(query: string) {

        //search query is different
        if (query !== this.searchStr) {
            //cached search query
            this.searchStr = query;
            //reset cached data
            this.cachedData = [];
            //reset page
            this.lastPage = 0;
            //call API
            this.load();
        }

    }

    private load() {

        if (this.searchStr) {

            const params: HttpParams = new HttpParams()
                .set('q', this.searchStr.trim().toLowerCase())
                .set('page', String(this.lastPage));

            this.subscription.add(
                this.apiService.get<any[]>(this.endpoint, params)
                    .pipe(
                        catchError(() => of([]))
                    )
                    .subscribe(list => {
                        this.cachedData = this.cachedData.concat(list);
                        this.dataSubject.next(this.cachedData);
                    }));

        }

    }

}