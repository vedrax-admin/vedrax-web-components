import { Observable } from "rxjs";

export class LoaderServiceStub {

    private loaderState: Observable<boolean>;

    get isLoading(): Observable<boolean> {
        return this.loaderState;
    }

    startLoading() { }

    stopLoading() { }
}