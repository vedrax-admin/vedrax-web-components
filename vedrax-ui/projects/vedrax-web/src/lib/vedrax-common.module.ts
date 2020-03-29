import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VedraxMaterialModule } from './material/vedrax-material.module';

import { VedraxFilterComponent } from './data-table/vedrax-filter/vedrax-filter.component';
import { VedraxTableComponent } from './data-table/vedrax-table/vedrax-table.component';
import { VedraxCheckboxComponent } from './form-controls/vedrax-checkbox/vedrax-checkbox.component';
import { VedraxControlComponent } from './form-controls/vedrax-control/vedrax-control.component';
import { VedraxControlsComponent } from './form-controls/vedrax-controls/vedrax-controls.component';
import { VedraxDatepickerComponent } from './form-controls/vedrax-datepicker/vedrax-datepicker.component';
import { VedraxDynamicComponent } from './form-controls/vedrax-dynamic/vedrax-dynamic.component';
import { VedraxFormCardComponent } from './form-controls/vedrax-form-card/vedrax-form-card.component';
import { VedraxFormControlComponent } from './form-controls/vedrax-form-control/vedrax-form-control.component';
import { VedraxFormModalComponent } from './form-controls/vedrax-form-modal/vedrax-form-modal.component';
import { VedraxInputComponent } from './form-controls/vedrax-input/vedrax-input.component';
import { VedraxMatrixComponent } from './form-controls/vedrax-matrix/vedrax-matrix.component';
import { VedraxNvpComponent } from './form-controls/vedrax-nvp/vedrax-nvp.component';
import { VedraxRadioComponent } from './form-controls/vedrax-radio/vedrax-radio.component';
import { VedraxSearchComponent } from './form-controls/vedrax-search/vedrax-search.component';
import { VedraxSelectComponent } from './form-controls/vedrax-select/vedrax-select.component';
import { VedraxValidationComponent } from './form-controls/vedrax-validation/vedrax-validation.component';
import { VedraxModalComponent } from './vedrax-modal/vedrax-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VedraxMaterialModule,
    RouterModule
  ],
  declarations: [
    VedraxFilterComponent,
    VedraxTableComponent,
    VedraxCheckboxComponent,
    VedraxControlComponent,
    VedraxControlsComponent,
    VedraxDatepickerComponent,
    VedraxDynamicComponent,
    VedraxFormCardComponent,
    VedraxFormControlComponent,
    VedraxFormModalComponent,
    VedraxInputComponent,
    VedraxMatrixComponent,
    VedraxNvpComponent,
    VedraxRadioComponent,
    VedraxSearchComponent,
    VedraxSelectComponent,
    VedraxValidationComponent,
    VedraxModalComponent
  ],
  exports: [
    VedraxFilterComponent,
    VedraxTableComponent,
    VedraxCheckboxComponent,
    VedraxControlComponent,
    VedraxControlsComponent,
    VedraxDatepickerComponent,
    VedraxDynamicComponent,
    VedraxFormCardComponent,
    VedraxFormControlComponent,
    VedraxFormModalComponent,
    VedraxInputComponent,
    VedraxMatrixComponent,
    VedraxNvpComponent,
    VedraxRadioComponent,
    VedraxSearchComponent,
    VedraxSelectComponent,
    VedraxValidationComponent,
    VedraxModalComponent
  ],
  entryComponents: [
    VedraxTableComponent,
    VedraxFormModalComponent,
    VedraxModalComponent
  ]
})
export class VedraxCommonModule { }
