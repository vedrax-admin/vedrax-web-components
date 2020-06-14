import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { VedraxApiService } from './vedrax-api.service';
import { Validate } from '../util/validate';
import { DescriptorForm } from '../descriptor/descriptor-form';
import { DescriptorOption } from '../descriptor/descriptor-option';
import { DescriptorFormControl } from '../descriptor/descriptor-form-control';
import { DescriptorEndpoint } from '../descriptor/descriptor-endpoint';
import { ControlType } from '../enum';

/**
 * Service that provides methods for getting descriptor form.
 */
@Injectable({
    providedIn: 'root'
})
export class FormDescriptorService {

    constructor(private apiService: VedraxApiService) { }

    /**
     * Method for initialized LOV
     * @param controls 
     * @param endpoints 
     */
    initLov(controls: DescriptorFormControl[] = [], endpoints: DescriptorEndpoint[] = []): Observable<any> {

        if (endpoints.length == 0) {
            return of([]);
        }

        return this.apiService.callEndpoints(endpoints).pipe(
            map(result => {
                endpoints.forEach(endpoint => {

                    const ctrl = this.getFormControl(controls, endpoint.key);

                    Validate.isNotNull(ctrl, `control with key [${endpoint.key}] does not exist.`);

                    ctrl.controlOptions = result[endpoint.key];
                });
            })
        );
    }

    /**
     * Get form descriptor and load LOVs if any
     * @param endpoint the API endpoint
     * @param lovs the LOVs reference used for updating
     */
    getDescriptor(endpoint: string, lovs: Map<string, Array<DescriptorOption>> = new Map()): Observable<DescriptorForm> {
        Validate.isNotNull(endpoint, 'endpoint must be provided');

        return this.apiService.get<DescriptorForm>(endpoint)
            .pipe(
                map(descriptor => [descriptor, this.manageLOV(descriptor, lovs)]),
                catchError(() => of(new DescriptorForm())),
                mergeMap(([descriptor, endpoints]: [DescriptorForm, Map<string, string>]) => this.apiService.getMultipleSource(descriptor, endpoints)),
                catchError(() => of({
                    descriptor: new DescriptorForm()
                })),//catch error for getting LOVs
                map(result => this.updateWithResponse(result, lovs))
            );
    }

    /**
     * Method that returns a map of controls with their respectives endpoint for retrieving LOVs
     * @param formDescriptor the form descriptor
     * @param lovs the cached LOVs
     */
    private manageLOV(formDescriptor: DescriptorForm, lovs: Map<string, Array<DescriptorOption>>): Map<string, string> {

        const emptyLovs: DescriptorEndpoint[] = formDescriptor.lovs || [];

        let apiCalls: Map<string, string> = new Map();

        emptyLovs.forEach(lov => {

            const key = lov.key;

            if (lovs.has(key)) {
                //LOV is in cache
                this.setOptions(formDescriptor, key, lovs.get(key));
            } else {
                //LOV is not in cache
                apiCalls.set(key, lov.url);
            }

        });

        return apiCalls;

    }

    /**
     * Method for updating the form descriptor with the returned LOVs
     * @param result the provided object with the form descriptor and the LOVs with their respective keys
     * @param lovs the cached LOV 
     */
    private updateWithResponse(result: object = {}, lovs: Map<string, Array<DescriptorOption>>): DescriptorForm {
        let formDescriptor: DescriptorForm = result['descriptor'];
        const entries = Object.entries(result);
        for (const [key, options] of entries) {
            if (key !== 'descriptor') {
                lovs.set(key, options);
                this.setOptions(formDescriptor, key, options);
            }
        }
        return formDescriptor;
    }

    private setOptions(formDescriptor: DescriptorForm, key: string, options: DescriptorOption[] = []): void {
        const keys = this.getKeys(key);
        const parent = keys[0];
        const child = keys[1];

        const ctrl = this.getFormControl(formDescriptor.controls, parent);

        Validate.isNotNull(ctrl, `control with key [${parent}] does not exist.`);

        if (child) {

            let childCtrl = this.getFormControl(ctrl.controlChildren, child);

            if (ctrl.controlType === ControlType.search) {

                childCtrl = this.getFormControl(ctrl.controlSearch.search.controls, child);

            }

            Validate.isNotNull(childCtrl, `control child with key [${child}] does not exist.`);

            childCtrl.controlOptions = options;

        } else {
            ctrl.controlOptions = options;
        }
    }

    /**
     * Method for getting the control by key
     * @param formDescriptor the form descriptor
     * @param key the key
     */
    private getFormControl(controls: DescriptorFormControl[] = [], key: string): DescriptorFormControl {
        return controls.find(ctrl => ctrl.controlName === key);
    }

    /**
     * Method for getting keys from string with separated value of ':'
     * @param key 
     */
    private getKeys(key: string): string[] {
        return key.split(":", 2);
    }

}