import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoaderService {

    /**
     * Hold the loading status that needs to be share with other components
     */
    private loadingStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loaderState$: Observable<boolean> = this.loadingStatus.asObservable();

    constructor() {}

    /**
     * Start loading
     */
    startLoading(): void {
        this.loadingStatus.next(true);
    }

    /**
     * Stop loading
     */
    stopLoading(): void {
        this.loadingStatus.next(false);
    }

}