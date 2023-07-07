import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: {[id:number]:number } = { 1: 400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  cols = 3;
  category : string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products : Array<Product> | undefined;
  sort ='desc';
  limit =12;
  productsSubscription: Subscription | undefined;

  constructor(private _cartService: CartService, private _storeService: StoreService) { }

  ngOnInit(): void {
  this.getAllProducts();
  }

  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }

  getAllProducts(): void {
    this.productsSubscription= this._storeService.getAllProducts(this.limit,this.sort,this.category)
      .subscribe((_products)=> {
        this.products= _products;
      })
  }

  onColumnsNumChanges(newColsNum : number) : void {
    this.cols = newColsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onSortChanges(newSort: string) : void {
    this.sort = newSort;
    this.getAllProducts();
  }

  onItemsShowNumChanges(newItemsNum : number) : void {
    this.limit = newItemsNum;
    this.getAllProducts();
  }

  onShowCategory(newCategory : string) : void {
    this.category = newCategory;
    this.getAllProducts();
  }

  onAddToCart(product : Product): void {
    this._cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }
}
