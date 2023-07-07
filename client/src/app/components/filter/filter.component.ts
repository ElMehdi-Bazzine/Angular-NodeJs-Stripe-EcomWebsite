import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnDestroy {

  @Output() showCategory = new EventEmitter<string>(); 

  categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;

  constructor(private _storeService: StoreService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  getAllCategories(): void {
    this.categoriesSubscription= this._storeService.getAllCategories()
      .subscribe((response)=> {
        this.categories = response;
      })
  }

  onShowCategory(category : string): void {
    this.showCategory.emit(category)
  }
}
