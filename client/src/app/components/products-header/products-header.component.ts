import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent implements OnInit {

  @Output() columnsNumChanges = new EventEmitter<number>();
  @Output() sortChanges = new EventEmitter<string>();
  @Output() itemsShowNumChanges = new EventEmitter<number>();

  sort = 'desc';
  itemsShowNum = 12;

  constructor() { }

  ngOnInit(): void {
  }

  onSortChanges(newSort : string) : void {
    this.sort = newSort;
    this.sortChanges.emit(this.sort)
  }

  onShowItemsNumChanges(newItemsNum : number) : void {
    this.itemsShowNum = newItemsNum;
    this.itemsShowNumChanges.emit(this.itemsShowNum)
  }

  onColumnsChanges(colsNum : number) : void {
    this.columnsNumChanges.emit(colsNum)
  }
}
