import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartItem } from 'src/app/models/cart.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cart : Cart = {items : [{
    product : 'https://via.placeholder.com/150',
    name: 'Sendala dial sbe3',
    price: 20,
    quantity: 1,
    id: 1
  },{
    product : 'https://via.placeholder.com/150',
    name: '7ellouma',
    price: 15,
    quantity: 2,
    id: 1
  }]}
  
  dataSource: Array<CartItem> = []

  displayedColumns: Array<string> = [
    'product', 
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  constructor(private _cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart: Cart) =>{
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items : Array<CartItem>) : number  {
    return this._cartService.getTotal(items)
  }

  onClearCart(): void {
    this._cartService.clearCart();
  }

  onRemoveItemFromCart(item : CartItem): void {
    this._cartService.removeItemFromCart(item);
  }

  onDecreaseItemQuantity(item: CartItem): void {
    this._cartService.decreaseItemQuantity(item)
  }

  onIncreaseItemQuantity(item: CartItem): void {
    this._cartService.increaseItemQuantity(item)
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items : this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51NQXppJas4HflB7CV5S7lAIOFUtJkSm9geUDQQgsTkvN5rsZfb9DLvlZb3kkj8VB9gJkgwZwz89LRTUUa97Lycsn002sTpQvwZ');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
