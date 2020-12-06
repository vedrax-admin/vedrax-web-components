import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VedraxMaterialModule } from './material/vedrax-material.module';

import { VedraxBaseComponent } from './shared/vedrax-base.component';
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
import { VedraxSelectComponent } from './form-controls/vedrax-select/vedrax-select.component';
import { VedraxValidationComponent } from './form-controls/vedrax-validation/vedrax-validation.component';
import { VedraxModalComponent } from './vedrax-modal/vedrax-modal.component';
import { VedraxLoginComponent } from './security/login/login.component';
import { jwtInterceptorProvider } from './security/interceptors/jwt.interceptor';
import { loaderInterceptorProvider } from './loader/interceptors/loader.interceptor';
import { VedraxLoaderComponent } from './loader/loader.component';
import { VedraxFormComponent } from './form-controls/vedrax-form/vedrax-form.component';
import { VedraxCrudComponent } from './vedrax-crud/vedrax-crud.component';
import { VedraxMultipleComponent } from './form-controls/vedrax-multiple/vedrax-multiple.component';
import { VedraxChipsComponent } from './form-controls/vedrax-chips/vedrax-chips.component';
import { DebounceClickDirective } from './util/debounce-click.directive';
import { VedraxAutocompleteComponent } from './form-controls/vedrax-autocomplete/vedrax-autocomplete.component';
import { VedraxSearchListComponent } from './form-controls/vedrax-search-list/vedrax-search-list.component';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from './services/moment-utc-date.adapter';
import { VedraxTitleComponent } from './form-controls/vedrax-title/vedrax-title.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ConfigService } from './services/config.service';
import { VedraxErrorHandler } from './security/error/vedrax-error-handler';
import { Configuration } from './shared/configuration';
import { VEDRAX_CONFIG_TOKEN } from './shared/di';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VedraxMaterialModule,
    MatTableExporterModule,
    RouterModule
  ],
  declarations: [
    VedraxBaseComponent,
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
    VedraxSelectComponent,
    VedraxValidationComponent,
    VedraxModalComponent,
    VedraxLoginComponent,
    VedraxLoaderComponent,
    VedraxFormComponent,
    VedraxCrudComponent,
    VedraxMultipleComponent,
    VedraxChipsComponent,
    DebounceClickDirective,
    VedraxAutocompleteComponent,
    VedraxSearchListComponent,
    VedraxTitleComponent
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
    VedraxSelectComponent,
    VedraxValidationComponent,
    VedraxModalComponent,
    VedraxLoginComponent,
    VedraxLoaderComponent,
    VedraxFormComponent,
    VedraxCrudComponent,
    VedraxAutocompleteComponent,
    VedraxSearchListComponent,
    VedraxTitleComponent
  ],
  entryComponents: [
    VedraxTableComponent,
    VedraxFormModalComponent,
    VedraxModalComponent
  ],
  providers: [
    jwtInterceptorProvider,
    { provide: ErrorHandler, useClass: VedraxErrorHandler },
    loaderInterceptorProvider,
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    ConfigService
  ]
})
export class VedraxWebModule {
  static forRoot(configuration: Configuration): ModuleWithProviders {
    console.log(configuration);
    return {
      ngModule: VedraxWebModule,
      providers: [{ provide: VEDRAX_CONFIG_TOKEN, useValue: configuration }]
    };
  }
}
