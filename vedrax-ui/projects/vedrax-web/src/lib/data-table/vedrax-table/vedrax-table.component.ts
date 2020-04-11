import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { VedraxTableDataSource } from './vedrax-table.datasource';
import { DescriptorTable, DescriptorAction, DescriptorModal, DescriptorForm } from '../../descriptor';
import { Validate } from '../../util/validate';
import { ActionType } from '../../enum';
import { VedraxApiService } from '../../services';
import { VedraxFormModalComponent } from '../../form-controls';
import { UrlConstructor } from '../../util';

/**
 * Class that defines a table component with its search box
 */
@Component({
  selector: 'vedrax-table',
  templateUrl: './vedrax-table.component.html',
  styleUrls: ['./vedrax-table.component.scss']
})
export class VedraxTableComponent implements AfterViewInit, OnInit, OnDestroy {

  /**
   * The table descriptor
   */
  @Input() descriptor: DescriptorTable;

  /**
   * Emit an event with data for selected row
   */
  @Output() onSelect = new EventEmitter<any>();

  /**
   * The displayed column of the table
   */
  displayedColumns: string[] = [];

  /**
   * Put search form in an expansion panel by default
   */
  search: boolean = true;

  /**
   * The query params
   */
  private params: HttpParams = new HttpParams();

  /**
   * The list of subscription
   */
  private subscription: Subscription = new Subscription();

  /**
   * The paginator
   */
  private paginator: MatPaginator;

  /**
   * The Paginator reference setter
   */
  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.paginator = matPaginator;
  }

  /**
   * The datasource
   */
  datasource: VedraxTableDataSource;

  constructor(
    private dialog: MatDialog,
    private apiService: VedraxApiService,
    private router: Router) { }

  ngOnInit() {
    this.displayedColumns = this.descriptor.columns.map(col => col.id);
    this.datasource = new VedraxTableDataSource(this.apiService);

    if (this.descriptor.loadOnInit) {
      this.load();
    }

  }

  /**
   * Call API every time the paginator changes via the {@link tap} operator
   */
  ngAfterViewInit(): void {
    {
      if (this.paginator) {
        this.subscription.add(this.paginator.page
          .pipe(
            tap(() => this.load())
          ).subscribe());
      }
    }
  }

  /**
   * Used for unsubscribing on destroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Method for generating the query params 
   * according to the returned data of the search form.
   * 
   * @param search 
   */
  filter(search: any = {}) {

    //re-initialize the query params
    this.params = new HttpParams();

    //convert object to array
    const entries = Object.entries(search);

    for (const [key, value] of entries) {
      if (value) {
        this.setQueryParam(key, value);
      }
    }

    this.load();
  }

  /**
   * load data
   */
  load(): void {
    if (this.descriptor.paginated) {
      this.setQueryParam('page', this.paginator.pageIndex);
      this.datasource.loadWithPagination(this.descriptor.path, this.params);
    } else {
      this.datasource.load(this.descriptor.path, this.params);
    }
  }

  /**
   * Helper method for setting a query param
   * 
   * @param key the query parameter key
   * @param value the query parameter value
   */
  private setQueryParam(key: string, value: any) {
    this.params = this.params.set(key, String(value));
  }

  /**
   * Method for selecting an item in the table
   * 
   * @param element the selected element
   */
  select(action: DescriptorAction, item: any): void {
    Validate.isNotNull(action, 'action must be provided');
    Validate.isNotNull(item, 'Item must be provided');

    if (action.action === ActionType.redirect) {
      this.redirectToUrl(action, item);
      return;
    }

    if (action.action === ActionType.form) {
      this.openFormDialogFromApi(action, item);
      return;
    }

    this.onSelect.emit({ action, item });
  }

  /**
   * Method for returning to the providing URL
   * @param action the provided action object for which the URL is constructed
   * @param item the provided selected item
   */
  private redirectToUrl(action: DescriptorAction, item: any): void {
    this.router.navigate([action.url, item['id'], action.fragment]);
  }

  /**
   * Method for editing a row in a table
   * @param action 
   * @param item 
   */
  private openFormDialogFromApi(action: DescriptorAction, item: any): void {
    Validate.isNotNull(action, 'action escriptor must be provided');
    Validate.isNotNull(item, 'item must be provided');

    let title = `${action.label} - ${item['id']}`;

    let endpoint: string = new UrlConstructor()
      .setFragment(action.url)
      .setFragment(`${item['id']}`)
      .setFragment(action.fragment)
      .build();

    this.subscription.add(
      this.apiService
        .get<DescriptorForm>(endpoint)
        .pipe(
          catchError(() => of(new DescriptorForm()))
        )
        .subscribe(formDescriptor => {
          if (formDescriptor) {
            this.openDialog(new DescriptorModal(title, formDescriptor));
          }
        }));

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

    this.subscription.add(
      dialogRef.afterClosed().subscribe(vo => {
        if (vo) {
          this.datasource.updateItem(vo);
        }
      }));

  }

}
