import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { VedraxTableDataSource } from './vedrax-table.datasource';

import { VedraxDataService } from '../services/vedrax-data.service';
import { DescriptorTable, DescriptorAction } from '../descriptor';

/**
 * Class that defines a table component with its search box
 */
@Component({
  selector: 'vedrax-table',
  templateUrl: './vedrax-table.component.html'
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

  constructor(public vedraxDataService: VedraxDataService,
    private router: Router) { }

  ngOnInit() {
    this.displayedColumns = this.descriptor.columns.map(col => col.id);
    this.datasource = new VedraxTableDataSource(this.vedraxDataService);

    //load on init
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
      this.vedraxDataService.load(this.descriptor, this.params);
    } else {
      this.vedraxDataService.loadValues(this.descriptor, this.params);
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
   * Add an item to the table
   * @param item 
   */
  addItem(item: any): void {
    this.vedraxDataService.addItem(item);
  }

  /**
   * Update an item by its ID
   * @param item the item to be updated
   */
  updateItem(item: any): void {
    this.vedraxDataService.updateItem(item);
  }

  /**
   * Method for selecting an item in the table
   * 
   * @param element the selected element
   */
  select(action: DescriptorAction, item: any): void {

    if (action && action.redirect) {
      this.router.navigate([action.url, item['id'], action.fragment]);
      return;
    }

    this.onSelect.emit({ action, item });
  }

}
