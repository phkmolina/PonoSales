import { Component, OnInit } from '@angular/core';
import { FormBuilder, CheckboxRequiredValidator } from '@angular/forms';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 items;
 checkoutForm;
 Total;
 shippingCosts;
 router: Router;
 constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    router: Router
  ) {
    this.items = this.cartService.getItems();
    this.router = router;
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: '',
      dataEnt: '',
      phone: '',
      mail: ''
    });
   }

  onSubmit(customerData) {
    var cQry = "";
    var itens = "";
    var cTxt = "";
    var aCart = this.cartService.getItems();
    var nX = 0;

   // Process checkout data here
   if (customerData.address==='' || customerData.name==='' || customerData.dataEnt===''){
      window.alert('Preenchimento do nome, endereço e data de entrega é obrigatório!');
    }else{

      cTxt = itens;
      cQry += ' mutation{ ';
      cQry += '   createCard(input:{';
      cQry += '             pipe_id: 1171323, fields_attributes:[';
      cQry += '                                 {field_id: "o_qu", field_value: "'+customerData.name+'"}';
      cQry += '                                 {field_id: "pedido", field_value: "';
      while (nX < aCart.length){
        cQry = cQry + (nX+1) + ") " + aCart[nX].name + " - " + aCart[nX].quant + " | ";
        nX++
      }
      cQry += '"}';
      cQry += '                                 {field_id: "data_hora_de_entrega_retirada",field_value: "'+
      customerData.dataEnt+'"}';
      cQry += '                                 {field_id: "retira_na_loja",field_value: "Entrega"}';
      cQry += '                                 {field_id: "rua",field_value: "'+customerData.address+'"}';
      cQry += '                                  ]}';
      cQry += '             ){ card { id title } }';
      cQry += '         }';
      console.log(cQry);
      this.httpService.post('https://api.pipefy.com/graphql',{ query:cQry},{}).toPromise()
        .then(response => { console.warn(response)});
      console.warn('Your order has been submitted', customerData);
      window.alert('Seu pedido foi efetuado com sucesso!');
      this.items = this.cartService.clearCart();
      this.checkoutForm.reset();
      this.router.navigateByUrl('/productList');
    }
  }

   KeepBuying(){
    // Process checkout data here
    this.router.navigateByUrl('/productList');
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.shippingCosts = this.cartService.getShippingPrices();
  }
  remFromCart(name){

    this.cartService.remFromCart(name);
  }

}
