import { Input, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DescriptorFormControl } from '../descriptor/descriptor-form-control';

/**
 * Base class for each control
 */
@Component({
    selector: 'vedrax-base',
    template: ''
  })
export class VedraxBaseComponent {

    /**
     * The form control
     */
    @Input() control: FormControl;

    /**
     * The control descriptor object
     */
    @Input() descriptor: DescriptorFormControl;

    /**
     * Helper method for checking in a template if a property exists. 
     * If the property exists, we return the property value, otherwise false.
     * 
     * @param name the property name
     */
    hasProperty(name: string): boolean {
        const properties = this.descriptor.controlProperties || [];
        const property = properties.find(property => property.propertyName === name);
        return property ? property.propertyValue : false;
    }
}