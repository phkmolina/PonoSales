import { ProductListComponent } from './../product-list/product-list.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

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
    this.cartService.addToCart(product);
    this.cartService.SumCount(1);
    this.router.navigateByUrl('/productList');
  }
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private httpService: HttpService,
  ) { this.router = router; }

 ngOnInit() {
   var nX = 1;
  while (nX <= 99) { this.kgs.push(nX); nX++; }
  this.route.paramMap.subscribe(params => {
  //this.product = params.get('productId')
  this.httpService.post('https://api.pipefy.com/graphql',{ query:'{  table_record (id: "'+params.get('productId')+'") { record_fields { name, value } } }'},{}).toPromise()
      .then(response => {
        nX = 0;
        console.log(response)
        while (nX < response.data.table_record.record_fields.length ) {
              this.product = {
                id: params.get('productId'),
                name: response.data.table_record.record_fields[response.data.table_record.record_fields.findIndex(obj => obj.name === 'Nome')].value,
                price: parseFloat(response.data.table_record.record_fields[response.data.table_record.record_fields.findIndex(obj => obj.name === 'Valor')].value.replace(',','.')),
                description: response.data.table_record.record_fields[response.data.table_record.record_fields.findIndex(obj => obj.name === 'Descrição')].value,
                quant: 0,
                image: response.data.table_record.record_fields[response.data.table_record.record_fields.findIndex(obj => obj.name === 'imagem')].value
          }
        nX++;
        }
      });
  });
}

}
