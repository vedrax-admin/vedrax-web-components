import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { Observable } from 'rxjs';
import { VedraxDataService } from '../services/vedrax-data.service';

/**
 * Class that implements the {@link DataSource}.
 */
export class VedraxTableDataSource extends DataSource<any[]>{

    constructor(private vedraxDataService: VedraxDataService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.vedraxDataService.dataAsObservable;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.vedraxDataService.complete();
    }

}