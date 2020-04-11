import { DescriptorFormControl } from '../descriptor/descriptor-form-control';

export class ControlsPerGroup {
    /**
     * The group name
     */
    name: string;

    /**
     * List of controls
     */
    controls: DescriptorFormControl[] = [];

    addControl(control: DescriptorFormControl): void {
        if (control) {
            this.controls.push(control);
        }
    }
}