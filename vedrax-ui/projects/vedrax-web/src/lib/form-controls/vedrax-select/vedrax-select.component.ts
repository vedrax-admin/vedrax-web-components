import { Component, Input, OnInit } from '@angular/core';
import { VedraxBaseComponent } from '../../shared/vedrax-base.component';
import { DescriptorOption } from '../../descriptor/descriptor-option';

/**
 * Class that defines a select component
 */
@Component({
  selector: 'vedrax-select',
  templateUrl: './vedrax-select.component.html'
})
export class VedraxSelectComponent extends VedraxBaseComponent implements OnInit {
  
  @Input() lovs?: Map<string, Array<DescriptorOption>> = new Map();

  ngOnInit(): void {

    if(!this.descriptor.controlOptions){
      this.descriptor.controlOptions = this.lovs.get(this.descriptor.controlName) || [];
    }
    
  }

  

}
