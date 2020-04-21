import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { VedraxApiService } from '../services/vedrax-api.service';
import { DescriptorForm } from '../descriptor/descriptor-form';
import { DescriptorTable } from '../descriptor/descriptor-table';
import { DescriptorOption } from '../descriptor/descriptor-option';
import { UrlConstructor } from '../util/url-constructor';
import { DescriptorAction } from '../descriptor/descriptor-action';
import { DescriptorModal } from '../descriptor/descriptor-modal';
import { VedraxFormModalComponent } from '../form-controls/vedrax-form-modal/vedrax-form-modal.component';
import { VedraxTableComponent } from '../data-table/vedrax-table/vedrax-table.component';
import { LovEndpoint } from '../shared/lov-endpoint';
import { ControlType } from '../enum/control-types';
import { DescriptorFormControl } from '../descriptor/descriptor-form-control';
import { Validate } from '../util/validate';
import { ActionType } from '../enum/action-types';

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
    private dialog: MatDialog,
    private apiService: VedraxApiService,
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

    if (this.createAction) {

      this.openFormDialogFromApi(this.createAction.label, this.createAction.url, true);

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

    const title = `${action.label} - ${item['id']}`;
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
      this.openFormDialogFromApi(title, endpoint, true);
      return;
    }
  }

  private openFormDialogFromApi(title: string, endpoint: string, isForCreate: boolean): void {
    Validate.isNotNull(title, 'title must be provided');
    Validate.isNotNull(endpoint, 'endpoint must be provided');

    let descriptorForm: DescriptorForm;

    this.subscription.add(
      this.apiService.get<DescriptorForm>(endpoint)
        .pipe(
          catchError(() => of(new DescriptorForm())),//catch error for getting form descfriptor
          map(descriptor => {
            descriptorForm = descriptor;
            return this.manageLOV(descriptor);
          }),
          mergeMap(endpoints => this.apiService.getMultipleSource(endpoints)),
          catchError(() => of({})),//catch error for getting LOVs
        ).subscribe((result: object) => {
          this.updateWithResponse(descriptorForm, result);
          if (isForCreate) {
            this.formDescriptor = descriptorForm;
          }
          this.openDialog(new DescriptorModal(title, descriptorForm));
        }));

  }

  private manageLOV(formDescriptor: DescriptorForm): Map<string, string> {

    const emptyLovs: LovEndpoint[] = this.hasEmptyLOV(formDescriptor);

    let apiCalls: Map<string, string> = new Map();

    emptyLovs.forEach(lov => {

      const key = lov.key;

      if (this.lovs.has(key)) {
        //LOV is in cache
        this.setOptions(formDescriptor, key, this.lovs.get(key));
      } else {
        //LOV is not in cache
        apiCalls.set(key, lov.endpoint);
      }

    });

    return apiCalls;

  }

  /**
   * Method that returns the list of LOV not set in the form descriptor
   * @param formDescriptor 
   */
  private hasEmptyLOV(formDescriptor: DescriptorForm): LovEndpoint[] {
    return formDescriptor.controls
      .filter(ctrl => ctrl.controlType == ControlType.select && ctrl.controlOptionsEndpoint && !ctrl.controlOptions)
      .map(lov => new LovEndpoint(lov.controlName, lov.controlOptionsEndpoint));
  }

  private updateWithResponse(formDescriptor: DescriptorForm, result: object = {}): void {
    const entries = Object.entries(result);
    for (const [key, options] of entries) {
      this.lovs.set(key, options);
      this.setOptions(formDescriptor, key, options);
    }
  }

  private setOptions(formDescriptor: DescriptorForm, key: string, options: DescriptorOption[] = []) {
    const ctrl = this.getFormControl(formDescriptor, key);
    if (ctrl) {
      ctrl.controlOptions = options;
    }
  }

  private getFormControl(formDescriptor: DescriptorForm, key: string): DescriptorFormControl {
    Validate.isNotNull(key, "key must be provided");

    return formDescriptor.controls.find(ctrl => ctrl.controlName === key);
  }

  /**
   * Method for returning to the providing URL
   * @param action the provided action object for which the URL is constructed
   * @param item the provided selected item
   */
  private redirectToUrl(endpoint: string, item: any): void {
    this.router.navigateByUrl(endpoint, { state: item });
  }

  /**
  * Method for opening a form dialog with the provided DescriptorForm returned from the API
  * @param action the action as create or edit
  * @param descriptor the provided Descriptor modal
  */
  private openDialog(descriptor: DescriptorModal): void {

    const dialogRef = this.dialog.open(VedraxFormModalComponent, {
      width: '600px',
      data: descriptor
    });

    if (descriptor.formDescriptor.updateTable) {

      this.subscription.add(
        dialogRef.afterClosed().subscribe(vo => {
          if (vo) {
            this.tableComponent.updateItem(vo);
          }
        }));

    }

  }


}
