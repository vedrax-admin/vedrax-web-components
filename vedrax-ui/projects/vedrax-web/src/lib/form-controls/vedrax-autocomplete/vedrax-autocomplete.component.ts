import { Component, OnInit, Input, OnDestroy, TemplateRef, ViewContainerRef, EmbeddedViewRef, NgZone } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DescriptorFormControl } from '../../descriptor/descriptor-form-control';
import { Subscription } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { VedraxAutocompleteDataSource } from './vedrax-autocomplete.datasource';
import { VedraxApiService } from '../../services/vedrax-api.service';
import { Validate } from 'vedrax-web/lib/util';
import Popper from 'popper.js';

@Component({
  selector: 'vedrax-autocomplete',
  templateUrl: './vedrax-autocomplete.component.html'
})
export class VedraxAutocompleteComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() descriptor: DescriptorFormControl;
  selected: any;
  label: string;

  private subscription: Subscription = new Subscription();

  searchControl = new FormControl();

  private datasource: VedraxAutocompleteDataSource;

  private view: EmbeddedViewRef<any>;

  private popper: Popper;

  visibleOptions = 4;

  constructor(
    private apiService: VedraxApiService,
    private vcr: ViewContainerRef,
    private zone: NgZone) {
    Validate.isNotNull(this.descriptor, "descriptor shoud be provided");
    Validate.isNotNull(this.descriptor.controlSearchUrl, "search endpoint shoud be provided");

    this.datasource = new VedraxAutocompleteDataSource(this.apiService, this.descriptor.controlSearchUrl)
  }

  ngOnInit(): void {

    this.selected = this.descriptor.controlValue || { key: -1, value: this.descriptor.controlLabel };

    this.subscription.add(this.searchControl.valueChanges
      .pipe(
        filter(res => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe((text: string) => {
        this.datasource.search(text);
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  select(option): void {

    if (option) {
      this.selected = option;
      this.formControl.setValue(option['key']);
    }

  }

  get formControl(): FormControl {
    return this.form.get(this.descriptor.controlName) as FormControl;
  }

  isActive(option): boolean {
    if (!this.selected) {
      return false;
    }
    return option['key'] === this.selected['key'];
  }

  open(dropdownTpl: TemplateRef<any>, origin: HTMLElement) {
    this.view = this.vcr.createEmbeddedView(dropdownTpl);
    const dropdown = this.view.rootNodes[0];

    document.body.appendChild(dropdown);
    dropdown.style.width = `${origin.offsetWidth}px`;

    this.zone.runOutsideAngular(() => {
      this.popper = new Popper(origin, dropdown, { removeOnDestroy: true });
    });
  }


}
