import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DescriptorForm } from '../descriptor/descriptor-form';
import { DescriptorTable } from '../descriptor/descriptor-table';
import { DescriptorOption } from '../descriptor/descriptor-option';
import { UrlConstructor } from '../util/url-constructor';
import { DescriptorAction } from '../descriptor/descriptor-action';
import { VedraxTableComponent } from '../data-table/vedrax-table/vedrax-table.component';
import { Validate } from '../util/validate';
import { ActionType } from '../enum/action-types';
import { FormDescriptorService } from '../services/form-descriptor.service';

/**
 * Class that represents a CRUD component
 */
@Component({
  selector: 'vedrax-crud',
  templateUrl: './vedrax-crud.component.html',
  styleUrls: ['./vedrax-crud.component.scss']
})
export class VedraxCrudComponent implements OnInit, OnDestroy {

  /**
   * the component title
   */
  @Input() title: string;

  /**
   * an optionnal back url
   */
  @Input() backUrl?: string;

  /**
   * a table descriptor
   */
  @Input() tableDescriptor: DescriptorTable;

  /**
   * an optionnal action descriptor for the create button
   */
  @Input() createAction?: DescriptorAction;

  @Output() onDialogOpen: EventEmitter<DescriptorForm> = new EventEmitter();

  /**
   * a form descriptor retrieve from API
   */
  formDescriptor: DescriptorForm;

  /**
   * cached LOVs
   */
  lovs?: Map<string, Array<DescriptorOption>> = new Map();

  /**
   * table component reference
   */
  @ViewChild(VedraxTableComponent) tableComponent: VedraxTableComponent;

  /**
  * The list of subscription
  */
  private subscription: Subscription = new Subscription();

  constructor(
    private formDescriptorService: FormDescriptorService,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Used for unsubscribing on destroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  create() {

    if (this.formDescriptor) {
      this.tableComponent.openDialog(this.formDescriptor);
    } else {
      this.openFormDialogFromApi(this.createAction.url, true);
    }

  }

  /**
  * Method for selecting an item in the table
  * 
  * @param element the selected element
  */
  select(action: DescriptorAction, item: any): void {
    Validate.isNotNull(action, 'action must be provided');
    Validate.isNotNull(item, 'Item must be provided');

    const endpoint: string = new UrlConstructor()
      .setFragment(action.url)
      .setFragment(`${item['id']}`)
      .setFragment(action.fragment)
      .build();

    if (action.action === ActionType.redirect) {
      this.redirectToUrl(endpoint, item);
      return;
    }

    if (action.action === ActionType.form) {
      this.openFormDialogFromApi(endpoint, false);
      return;
    }
  }

  private openFormDialogFromApi(endpoint: string, isForCreate: boolean): void {
    Validate.isNotNull(endpoint, 'endpoint must be provided');

    this.subscription.add(
      this.formDescriptorService.getDescriptor(endpoint, this.lovs)
        .pipe(
          map((descriptor) => {
            if (isForCreate) {
              this.formDescriptor = descriptor;
            }
            return descriptor;
          })
        ).subscribe(descriptor => {
          if (descriptor) {
            this.tableComponent.openDialog(descriptor);
          }
        }));
  }

  /**
   * Method for returning to the providing URL
   * @param action the provided action object for which the URL is constructed
   * @param item the provided selected item
   */
  private redirectToUrl(endpoint: string, item: any): void {
    this.router.navigateByUrl(endpoint, { state: item });
  }

}
