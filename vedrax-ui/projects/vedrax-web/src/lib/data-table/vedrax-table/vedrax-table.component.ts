import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { VedraxTableDataSource } from './vedrax-table.datasource';

import { DescriptorTable } from '../../descriptor/descriptor-table';
import { DescriptorAction } from '../../descriptor/descriptor-action';
import { VedraxApiService } from '../../services/vedrax-api.service';

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
   * Total elements
   */
  totalLength: number = 0;

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
    private apiService: VedraxApiService) { }

  ngOnInit() {
    this.displayedColumns = this.descriptor.columns.map(col => col.id);
    this.datasource = new VedraxTableDataSource(this.apiService);

    if (this.descriptor.loadOnInit) {
      this.load();
    }

    this.subscription.add(
      this.datasource.totalItems$.subscribe(nb => this.totalLength = nb));

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
    this.onSelect.emit({ action, item });
  }

  /**
   * Add manually an item
   * @param item 
   */
  public addItem(item: any) {
    if (item) {
      this.datasource.addItem(item);
    }
  }

  /**
   * Update manually an item by its ID
   * @param item 
   */
  public updateItem(item: any) {
    if (item) {
      this.datasource.updateItem(item);
    }
  }

}
