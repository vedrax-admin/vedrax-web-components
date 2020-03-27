import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { MatrixColumn } from '../shared/matrixColumn';
import { NVP } from '../shared/nvp';

/**
 * Service that provides methods for creating reactive form.
 */
@Injectable({
    providedIn: 'root'
})
export class MatrixService {

    constructor(private formBuilder: FormBuilder) { }

    createFormGroup(matrix: MatrixColumn[]): FormGroup {
        const form: FormGroup = this.formBuilder.group({
            matrix: this.formBuilder.array([])
        });
        this.populateWithMatrix(form,matrix);
        return form;
    }

    private populateWithMatrix(form: FormGroup, matrix: MatrixColumn[]) {
        const formArray = this.getMatrix(form);
        for (let entry of matrix) {
            formArray.push(this.addMatrix(entry));
        }
    }

    getMatrix(form: FormGroup): FormArray {
        return form.get('matrix') as FormArray;
      }

    private addMatrix(matrixColumn: MatrixColumn): FormGroup {
        return this.formBuilder.group({
            key: matrixColumn.key,
            entries: this.formBuilder.array(this.addEntries(matrixColumn.entries))
        });
    }

    private addEntries(entries: NVP[]): FormGroup[] {
        let elements: FormGroup[] = [];

        for (let entry of entries) {
            elements.push(this.formBuilder.group(entry));
        }
        return elements;
    }

}