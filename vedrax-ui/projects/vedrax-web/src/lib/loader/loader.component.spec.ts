import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { VedraxLoaderComponent } from './loader.component';
import { LoaderService } from '../services/loader.service';

describe('LoaderComponent', () => {

    let component: VedraxLoaderComponent;
    let fixture: ComponentFixture<VedraxLoaderComponent>;
    let loaderService: LoaderService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [VedraxLoaderComponent],
            providers: [
                LoaderService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VedraxLoaderComponent);
        component = fixture.componentInstance;
        loaderService = TestBed.get(LoaderService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});