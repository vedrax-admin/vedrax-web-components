import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
    selector: 'vedrax-loader',
    templateUrl: './loader.component.html',
    styleUrls:['./loader.component.scss']
})
export class VedraxLoaderComponent {

    constructor(public loaderService: LoaderService) {}

}