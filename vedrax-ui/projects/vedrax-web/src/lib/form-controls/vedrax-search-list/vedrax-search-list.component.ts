import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { VedraxSearchListDataSource } from './vedrax-search-list.datasource';
import { VedraxApiService } from '../../services/vedrax-api.service';
import { NVP } from '../../shared/nvp';

@Component({
  selector: 'metrolab-vedrax-search-list',
  templateUrl: './vedrax-search-list.component.html',
  styleUrls: ['./vedrax-search-list.component.scss']
})
export class VedraxSearchListComponent implements OnInit, OnDestroy {

  /**
   * API endpoint to call
   */
  @Input() endpoint: string;

  @Input() label: string;

  /**
   * Apply by default query parameters to the endpoint
   */
  @Input() params: NVP[] = [];

  @Input() filters: NVP[] = [];

  @Output() onClosed = new EventEmitter();
  @Output() onSelect = new EventEmitter();

  private subscription: Subscription = new Subscription();

  searchControl = new FormControl();
  filterControl = new FormControl();

  datasource: VedraxSearchListDataSource;

  visibleOptions = 4;
  withFilter: boolean = false;

  constructor(private apiService: VedraxApiService) { }

  ngOnInit(): void {
    this.datasource = new VedraxSearchListDataSource(this.apiService, this.endpoint, this.params);

    //init filter value by default
    if (this.filters && this.filters.length > 0) {
      this.filterControl.setValue(this.filters[0].key);
      this.withFilter = true;
    }

    this.subscription.add(this.searchControl.valueChanges
      .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe((text: string) => {
        this.datasource.search(text, this.filterControl.value);
      }));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search() {
    this.datasource.search(this.searchControl.value, this.filterControl.value);
  }

  select(option): void {

    if (option) {
      this.onSelect.emit(option);
    }

  }

  close(): void {
    this.onClosed.emit(true);
  }


}
