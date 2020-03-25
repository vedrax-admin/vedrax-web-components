import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material';
import { VedraxControlsComponent } from './form-controls/vedrax-controls/vedrax-controls.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  declarations: [VedraxControlsComponent],
  exports: []
})
export class VedraxWebLibModule { }
