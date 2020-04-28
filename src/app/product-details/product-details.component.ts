import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product;
  kgs = [];
  cbQuant:number;

  addToCart(product) {
    var bkpPreco = product.price;
    var bkpQuant = product.quant;
    product.quant = this.cbQuant;
    product.price = this.cbQuant * product.price;
    console.log(product.quant);
    this.cartService.addToCart(product);
    this.cartService.SumCount(1);
    this.router.navigateByUrl('/productList');
  }
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
  ) { this.router = router; }

 ngOnInit() {
   var nX = 1;
  while (nX <= 99) { this.kgs.push(nX); nX++; }
  this.route.paramMap.subscribe(params => {
    this.product = products[+params.get('productId')];
  });
}

}
