import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  nCount = 0;
  isLogged = true;
  cartPrice = 0;
  configUrl = 'assets/config.json';
  userID = 0;

  getConfig() {
    return this.http.get(this.configUrl);
  }

  constructor(
    private http: HttpClient
  ) {}

  addToCart(product) {
    this.items.push(product);
    this.cartPrice =  this.cartPrice + (product.price);
  }

  remFromCart(product){
    this.cartPrice =  this.cartPrice - product.price;
    this.nCount = this.nCount - 1;
    this.items.splice(this.items.indexOf(product), 1);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.nCount = 0;
    this.cartPrice = 0;
    return this.items;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }

  SumCount(nSum)
  {
    this.nCount = this.nCount + nSum;
  }

  loggedIn(ID)
  {
    this.userID = ID;
    this.isLogged = true;
  }

  loggedOut()
  {
    this.isLogged = false;
    this.userID = 0;
  }


}
