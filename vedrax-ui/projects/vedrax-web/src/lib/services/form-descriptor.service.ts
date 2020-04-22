import { Injectable } from '@angular/core';
import { VedraxApiService } from './vedrax-api.service';
import { Validate } from '../util/validate';
import { DescriptorForm } from '../descriptor/descriptor-form';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { LovEndpoint } from '../shared/lov-endpoint';
import { ControlType } from '../enum/control-types';
import { DescriptorOption } from '../descriptor/descriptor-option';
import { DescriptorFormControl } from '../descriptor/descriptor-form-control';

/**
 * Service that provides methods for getting descriptor form.
 */
@Injectable({
    providedIn: 'root'
})
export class FormDescriptorService {

    constructor(private apiService: VedraxApiService) { }

    /**
     * Get form descriptor and load LOVs if any
     * @param endpoint the API endpoint
     * @param lovs the LOVs reference used for updating
     */
    getDescriptor(endpoint: string, lovs: Map<string, Array<DescriptorOption>> = new Map()): Observable<DescriptorForm> {
        Validate.isNotNull(endpoint, 'endpoint must be provided');

        return this.apiService.get<DescriptorForm>(endpoint)
            .pipe(
                catchError(() => of(new DescriptorForm())),//catch error for getting form descfriptor
                map(descriptor => [descriptor, this.manageLOV(descriptor, lovs)]),
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

        const emptyLovs: LovEndpoint[] = this.hasEmptyLOV(formDescriptor);

        let apiCalls: Map<string, string> = new Map();

        emptyLovs.forEach(lov => {

            const key = lov.key;

            if (lovs.has(key)) {
                //LOV is in cache
                this.setOptions(formDescriptor, key, lovs.get(key));
            } else {
                //LOV is not in cache
                apiCalls.set(key, lov.endpoint);
            }

        });

        return apiCalls;

    }

    /**
     * Method that returns the list of controls without LOV initialized
     * @param formDescriptor the form descriptor
     */
    private hasEmptyLOV(formDescriptor: DescriptorForm): LovEndpoint[] {
        return formDescriptor.controls
            .filter(ctrl => ctrl.controlType === ControlType.select && ctrl.controlOptionsEndpoint && !ctrl.controlOptions)
            .map(lov => new LovEndpoint(lov.controlName, lov.controlOptionsEndpoint));
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

    /**
     * Method for setting options
     * @param formDescriptor the form descriptor
     * @param key the control key
     * @param options the options the control 
     */
    private setOptions(formDescriptor: DescriptorForm, key: string, options: DescriptorOption[] = []) {
        const ctrl = this.getFormControl(formDescriptor, key);
        if (ctrl) {
            ctrl.controlOptions = options;
        }
    }

    /**
     * Method for getting the control by key
     * @param formDescriptor the form descriptor
     * @param key the key
     */
    private getFormControl(formDescriptor: DescriptorForm, key: string): DescriptorFormControl {
        return formDescriptor.controls.find(ctrl => ctrl.controlName === key);
    }

}