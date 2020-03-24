import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DescriptorFormControl, DescriptorProperty } from '../descriptor';
import { ControlType } from '../enum';
import { Validate } from '../util/validate';

/**
 * Service that provides methods for creating reactive form.
 */
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

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
  createFormControl(descriptor: DescriptorFormControl) {
    Validate.isNotNull(descriptor, 'Descriptor must be provided');

    if (descriptor.controlType === ControlType.arrayOfControls) {
      return this.createControlWithChildren(descriptor);
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

  /**
   * Helper method for checking if control is readonly
   * @param descriptor 
   */
  private isDisabled(properties: DescriptorProperty[] = []): boolean {
    return properties.some(property => property.propertyName === 'readOnly');
  }

  /**
   * Helper method for creating a {@link FormArray}.
   * 
   * @param descriptor 
   */
  private createControlWithChildren(descriptor: DescriptorFormControl): FormArray {

    const controls = descriptor.controlChildren || [];

    let validations = this.createValidation(descriptor);
    let children = {};

    controls.forEach(ctrl => {
      children[ctrl.controlName] = this.createControl(ctrl);
    });

    return new FormArray([new FormGroup(children)], validations);
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