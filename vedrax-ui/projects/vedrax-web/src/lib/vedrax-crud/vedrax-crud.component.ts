import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VedraxApiService } from '../services/vedrax-api.service';
import { DescriptorForm } from '../descriptor/descriptor-form';
import { DescriptorTable } from '../descriptor/descriptor-table';
import { DescriptorOption } from '../descriptor/descriptor-option';
import { UrlConstructor } from '../util/url-constructor';
import { DescriptorAction } from '../descriptor/descriptor-action';
import { Subscription, of, Observable, forkJoin } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DescriptorModal } from '../descriptor/descriptor-modal';
import { VedraxFormModalComponent } from '../form-controls/vedrax-form-modal/vedrax-form-modal.component';
import { VedraxTableComponent } from '../data-table/vedrax-table/vedrax-table.component';
import { LovEndpoint } from '../shared/lov-endpoint';
import { ControlType } from '../enum/control-types';
import { DescriptorFormControl } from '../descriptor/descriptor-form-control';
import { Validate } from '../util/validate';
import { ActionType } from '../enum/action-types';
import { Router } from '@angular/router';

@Component({
  selector: 'vedrax-crud',
  templateUrl: './vedrax-crud.component.html',
  styleUrls: ['./vedrax-crud.component.scss']
})
export class VedraxCrudComponent implements OnInit {

  @Input() title: string;
  @Input() backUrl?: string;
  @Input() tableDescriptor: DescriptorTable;
  @Input() createDescriptor?: DescriptorAction;

  private formDescriptor: DescriptorForm;
  private lovs?: Map<string, Array<DescriptorOption>> = new Map();
  private apiCalls: LovEndpoint[] = [];

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

  create() {

    if (this.createDescriptor) {

      this.openFormDialogFromApi(this.createDescriptor.label, this.createDescriptor.url);

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
      this.openFormDialogFromApi(title, endpoint);
      return;
    }
  }

  private openFormDialogFromApi(title: string, endpoint: string) {

    this.apiService.get<DescriptorForm>(endpoint).pipe(
      map(descriptor => {
        this.formDescriptor = descriptor;
        return this.manageLOV();
      }),
      mergeMap(endpoints => this.apiService.getMultipleSource(endpoints)),
      catchError(() => of([]))
    ).subscribe(results => {
      this.apiCalls.forEach((api, index) => {
        const key = api.key;
        const options = results[index];
        this.lovs.set(key, options);
        this.setOptions(key, options);
      });
      this.openDialog(new DescriptorModal(title, this.formDescriptor));
    });
  }

  private manageLOV(): string[] {

    const emptyLovs: LovEndpoint[] = this.hasEmptyLOV();

    this.apiCalls = [];
    let endpoints: string[] = [];

    emptyLovs.forEach(lov => {

      const key = lov.key;

      if (this.lovs.has(key)) {
        //LOV is in cache
        this.setOptions(key, this.lovs.get(key));
      } else {
        //LOV is not in cache
        this.apiCalls.push(lov);
        endpoints.push(lov.endpoint);
      }

    });

    return endpoints;

  }

  /**
   * Method that returns the list of LOV not set in the form descriptor
   * @param formDescriptor 
   */
  private hasEmptyLOV(): LovEndpoint[] {
    if (this.formDescriptor) {
      return this.formDescriptor.controls
        .filter(ctrl => ctrl.controlType == ControlType.select && ctrl.controlOptionsEndpoint && !ctrl.controlOptions)
        .map(lov => new LovEndpoint(lov.controlName, lov.controlOptionsEndpoint));
    }
    return [];
  }

  private setOptions(key: string, options: DescriptorOption[] = []) {
    const ctrl = this.getFormControl(key);
    if (ctrl) {
      ctrl.controlOptions = options;
    }
  }

  private getFormControl(key: string): DescriptorFormControl {
    Validate.isNotNull(key, "key must be provided");

    return this.formDescriptor && this.formDescriptor.controls.find(ctrl => ctrl.controlName === key);
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
