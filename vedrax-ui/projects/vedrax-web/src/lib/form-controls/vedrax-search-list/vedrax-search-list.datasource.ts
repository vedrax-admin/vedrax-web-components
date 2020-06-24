import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { VedraxApiService } from '../../services/vedrax-api.service';
import { DescriptorPage } from '../../descriptor/descriptor-page';
import { NVP } from '../../shared/nvp';

/**
 * Class that implements the {@link DataSource}.
 */
export class VedraxSearchListDataSource extends DataSource<any[]>{

    private subscription: Subscription = new Subscription();
    private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private cachedData: any[] = [];
    private pageSize = 30;
    private lastPage = 0;
    private searchStr: string;

    constructor(private apiService: VedraxApiService,
        private endpoint: string,
        private params: NVP[]) {
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
            //reset list
            this.cachedData = [];
            this.dataSubject.next(this.cachedData);
            //reset page
            this.lastPage = 0;
            //call API
            this.load();
        }

    }

    private load() {

        if (this.searchStr) {

            const queryParams = this.params || [];

            let parameters: HttpParams = new HttpParams()
                .set('q', this.searchStr.trim().toLowerCase())
                .set('page', String(this.lastPage));

            queryParams.forEach(param => {
                parameters = parameters.set(String(param.key), String(param.value));
            });


            this.subscription.add(
                this.apiService.get<DescriptorPage>(this.endpoint, parameters)
                    .pipe(
                        catchError(() => of(new DescriptorPage()))
                    )
                    .subscribe(page => {
                        this.cachedData = this.cachedData.concat(page.content);
                        this.dataSubject.next(this.cachedData);
                    }));

        }

    }

}