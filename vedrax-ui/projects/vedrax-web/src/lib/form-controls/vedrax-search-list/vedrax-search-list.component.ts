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
  styleUrls:['./vedrax-search-list.component.scss']
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
  @Input() params: NVP[];

  @Output() onClosed = new EventEmitter();
  @Output() onSelect = new EventEmitter();

  private subscription: Subscription = new Subscription();

  searchControl = new FormControl();

  datasource: VedraxSearchListDataSource;

  visibleOptions = 4;

  constructor(private apiService: VedraxApiService) { }

  ngOnInit(): void {
    this.datasource = new VedraxSearchListDataSource(this.apiService, this.endpoint, this.params);

    this.subscription.add(this.searchControl.valueChanges
      .pipe(
        filter(Boolean),
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
      this.onSelect.emit(option);
    }

  }

  close(): void {
    this.onClosed.emit(true);
  }


}
