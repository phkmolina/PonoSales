import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  groups=[];
  products = [];//products;
  kgs = [];
  gr=[];
  lProdutos=false;
  cbQuant: number;
  lLoading=true;
  addToCart(product) {
    this.cartService.addToCart(product);
    this.cartService.SumCount(1);
  }

  groupClick(cGrupo){
    this.products=[];
    var nX = 1;
    var nField = -1;
    this.lProdutos=true;

    nX = 0;

    while (nX <= 900) { this.gr.push(nX); nX = nX+50; }
    this.httpService.post('https://api.pipefy.com/graphql',{ query:'{  table_records (table_id: "RrbMVRMc") { edges { node{ id, title, record_fields{name, value} } } } } }'},{}).toPromise()
      .then(response => {
        nX = 0;
        while (nX < response.data.table_records.edges.length ) {
          nField = response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Ativo');
          if (nField >= 0) {
            if ((response.data.table_records.edges[nX].node.record_fields[nField].value == "Sim") && (response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Grupo')].value.match(cGrupo))){
              this.products.push({
                id: response.data.table_records.edges[nX].node.id,
                name: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Nome')].value,
                price: parseFloat(response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Valor')].value.replace(',','.')),
                description: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Descrição')].value,
                quant: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Saldo')].value,
                image: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'imagem')].value,
                group: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Grupo')].value
              });
            }
          }
        nX++;
        }
        this.lLoading=false;
      });
  }

  share() {
    window.alert('The product has been shared!');
  }

   onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

   constructor(
    private cartService: CartService,
    private httpService: HttpService,
  ) {
    var nX = 1;
    var nField = -1;
    var grupo = "";
    while (nX <= 99) { this.kgs.push(nX); nX++; }

     /* this.httpService.post('https://api.pipefy.com/graphql',{ query:'{  table_records (table_id: "RrbMVRMc") { edges { node{ id, title, record_fields{name, value} } } } } }'},{}).toPromise()
      .then(response => {
        nX = 0;
        while (nX < response.data.table_records.edges.length ) {
          nField = response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Ativo');
          if (nField >= 0) {
            if (response.data.table_records.edges[nX].node.record_fields[nField].value == "Sim"){
              this.products.push({
                id: response.data.table_records.edges[nX].node.id,
                name: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Nome')].value,
                price: parseFloat(response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Valor')].value.replace(',','.')),
                description: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Descrição')].value,
                quant: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Saldo')].value,
                image: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'imagem')].value,
                group: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Grupo')].value
              });
            }
          }
        nX++;
        }
      });*/

      this.httpService.post('https://api.pipefy.com/graphql',{ query:'{  table_records (table_id: "O8RL0FmE") { edges { node{ id, title, record_fields{name, value} } } } } }'},{}).toPromise()
      .then(response => {
        nX = 0;
        while (nX < response.data.table_records.edges.length ) {
          nField = response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Ativo');
          if (nField >= 0) {
            if (response.data.table_records.edges[nX].node.record_fields[nField].value == "Sim"){
              this.groups.push({
                id: response.data.table_records.edges[nX].node.id,
                name: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Grupo')].value,
                image: response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Imagem')].value
              });
            }
          }
        nX++;
        }
        this.lLoading=false;
      });

  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
