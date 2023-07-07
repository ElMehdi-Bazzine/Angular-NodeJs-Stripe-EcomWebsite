import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({items: []})

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item : CartItem) : void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if(itemInCart) {
      itemInCart.quantity++;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to the cart.', 'Ok', {duration: 4000})
    console.log(this.cart.value);
  }

  getTotal(items : Array<CartItem>) : number  {
    return items.map((item)=> item.price * item.quantity)
            .reduce((prev, curr) => prev + curr, 0) 
  }

  clearCart(): void {
    this.cart.next({ items: []});
    this._snackBar.open('Cart is cleared', 'Ok', {duration: 4000});
  }

  removeItemFromCart(item : CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id != item.id
    );

    this.cart.next({items: filteredItems});
    this._snackBar.open('1 item removed from cart', 'Ok', {duration:4000})
  }

  decreaseItemQuantity(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if(itemInCart != undefined ){
      if(itemInCart.quantity == 1) this.removeItemFromCart(itemInCart)
      itemInCart.quantity--;
      this._snackBar.open('1 item removed from cart', 'Ok', {duration:4000})
    }
    
  }

  increaseItemQuantity(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if(itemInCart != undefined )itemInCart.quantity++;
    this._snackBar.open('1 item added to the cart.', 'Ok', {duration: 4000})
  }
}
