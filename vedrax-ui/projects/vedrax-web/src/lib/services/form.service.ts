import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

import { DescriptorFormControl, DescriptorProperty } from '../descriptor';
import { ControlType } from '../enum';
import { Validate } from '../util/validate';
import { MatrixColumn } from '../shared/matrixColumn';
import { NVP } from '../shared/nvp';

/**
 * Service that provides methods for creating reactive form.
 */
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) { }

  /**
   * Method for creating a group of controls as a {@link FormGroup} by passing 
   * an array of {@link DescriptorFormControl}.
   * 
   * @param descriptors the list of controls
   */
  createFormGroup(descriptors: DescriptorFormControl[] = []): FormGroup {
    const formGroup = {};
    descriptors.forEach(ctrl => {
      formGroup[ctrl.controlName] = this.createFormControl(ctrl);
    });
    return new FormGroup(formGroup);
  }

  /**
   * Method for creating a control. 
   * 
   * If the control type is 'ARRAY_CONTROLS', then we create 
   * a {@link FormArray} otherwise {@link FormControl} is created.
   * 
   * @param descriptor
   */
  createFormControl(descriptor: DescriptorFormControl): FormControl | FormArray {
    Validate.isNotNull(descriptor, 'Descriptor must be provided');

    if (descriptor.controlType === ControlType.arrayOfControls) {
      return this.createControlWithChildren(descriptor);
    }

    if (descriptor.controlType === ControlType.matrix) {
      return this.createControlWithMatrix(descriptor);
    }

    if (descriptor.controlType === ControlType.nvp) {
      return this.createControlWithNvp(descriptor);
    }

    if (descriptor.controlType === ControlType.chips) {
      return this.createControlWithChips(descriptor);
    }

    if (descriptor.controlType === ControlType.multiple) {
      return this.createControlWithChips(descriptor);
    }

    if(descriptor.controlType === ControlType.autocomplete){
      return this.createControlWithAutocomplete(descriptor);
    }

    return this.createControl(descriptor);
  }

  /**
   * Helper method for creating a {@link FormControl}.
   * 
   * @param descriptor
   */
  private createControl(descriptor: DescriptorFormControl): FormControl {
    let validations = this.createValidation(descriptor);

    return new FormControl({ value: descriptor.controlValue, disabled: this.isDisabled(descriptor.controlProperties) }, validations);
  }

  private createControlWithValue(descriptor: DescriptorFormControl, value: any) {
    let validations = this.createValidation(descriptor);

    return new FormControl({ value: value, disabled: this.isDisabled(descriptor.controlProperties) }, validations);

  }

  /**
   * Helper method for checking if control is readonly
   * @param descriptor 
   */
  private isDisabled(properties: DescriptorProperty[] = []): boolean {
    return properties.some(property => property.propertyName === 'readOnly');
  }

  private createControlWithAutocomplete(descriptor: DescriptorFormControl): FormControl {

    const value = descriptor.controlValue || {};

    return this.createControlWithValue(descriptor, value['key']);
  }

  /**
   * Helper method for creating a {@link FormArray}.
   * 
   * @param descriptor 
   */
  private createControlWithChildren(descriptor: DescriptorFormControl): FormArray {

    const controls = descriptor.controlChildren || [];
    const values: any[] = descriptor.controlValue || [];

    let validations = this.createValidation(descriptor);

    let groups: FormGroup[] = values.length > 0
      ? this.createGroupsFromChildrenWithValues(controls, values)
      : this.createGroupsFromChildrenWithoutValue(controls);

    return new FormArray(groups, validations);
  }

  private createGroupsFromChildrenWithValues(controls: DescriptorFormControl[] = [], values: any[] = []) {

    let groups: FormGroup[] = [];

    values.forEach(element => {
      let children = {};

      controls.forEach(ctrl => {
        children[ctrl.controlName] = this.createControlWithValue(ctrl, element[ctrl.controlName]);
      });

      groups.push(new FormGroup(children));
    });

    return groups;
  }

  private createGroupsFromChildrenWithoutValue(controls: DescriptorFormControl[] = []) {
    let children = {};
    controls.forEach(ctrl => {
      children[ctrl.controlName] = this.createControl(ctrl);
    });
    return [new FormGroup(children)];
  }

  private createControlWithMatrix(descriptor: DescriptorFormControl): FormArray {
    const matrices: MatrixColumn[] = descriptor.controlValue || [];

    const matrix: FormGroup[] = [];

    for (let entry of matrices) {
      matrix.push(this.addMatrix(entry));
    }

    return this.formBuilder.array(matrix);
  }

  private createControlWithNvp(descriptor: DescriptorFormControl): FormArray {
    const nvps: NVP[] = descriptor.controlValue || [];

    return this.formBuilder.array(this.addEntries(nvps));
  }

  private createControlWithChips(descriptor: DescriptorFormControl): FormArray {
    const chips: string[] | number[] = descriptor.controlValue || [];

    return this.formBuilder.array(this.addChipEntries(chips));
  }

  getFormArray(form: FormGroup, fieldName: string): FormArray {
    Validate.isNotNull(form, 'form must be provided');
    Validate.isNotNull(fieldName, 'fieldName must be provided');

    return form.get(fieldName) as FormArray;
  }

  private addMatrix(matrixColumn: MatrixColumn): FormGroup {
    return this.formBuilder.group({
      visible: matrixColumn.visible,
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

  private addChipEntries(chips: string[] | number[]): FormControl[] {
    let elements: FormControl[] = [];

    for (let entry of chips) {
      elements.push(this.formBuilder.control(entry));
    }

    return elements;
  }

  /**
   * Helper method for generating the list of validations per control
   * 
   * @param ctrl 
   */
  private createValidation(ctrl: DescriptorFormControl) {

    const controlValidations = ctrl.controlValidations || [];

    let validations = [];

    controlValidations.forEach(validation => {
      validations.push(this.validationToMap(validation.validationName,
        validation.validationValue));
    });

    return validations;
  }

  private validationToMap(name: string, value: any) {
    const validationMap = new Map()
      .set('max', Validators.max(value))
      .set('maxlength', Validators.maxLength(value))
      .set('min', Validators.min(value))
      .set('minlength', Validators.minLength(value))
      .set('pattern', Validators.pattern(value))
      .set('required', Validators.required)
      .set('email', Validators.email);
    return validationMap.get(name.toLowerCase());
  }
}
