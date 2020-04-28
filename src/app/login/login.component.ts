import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { HttpService } from '../http.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  router: Router;
  constructor(
    private formBuilder: FormBuilder,
    router: Router,
    private cartService: CartService,
    private httpService: HttpService,

  ) {
     this.router = router;
     this.loginForm = this.formBuilder.group({
      login: '',
      password: ''
    });

   }


  ngOnInit() {
    this.cartService.loggedOut()
  }

  onSubmit(customerData) {
    var aUsers = [];
    var nX = 0;
    var lLogUsr = false;
    var lLogPsw = false;
    this.httpService.post('https://api.pipefy.com/graphql',{ query:'{  table_records (table_id: "5_5ZcNvG") { edges { node{ id, title, record_fields{name, value} } } } } }'},{}).toPromise()
      .then(response => {
        nX = 0;
        while (nX < response.data.table_records.edges.length && !lLogUsr) {
          if (response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'CNPJ/CPF')].value === customerData.login)
          {
            lLogUsr = true;
            if (response.data.table_records.edges[nX].node.record_fields[response.data.table_records.edges[nX].node.record_fields.findIndex(obj => obj.name === 'Senha')].value === customerData.password)
            {
              lLogPsw = true;
              console.warn('Login successfull!', customerData);
              this.cartService.loggedIn(response.data.table_records.edges[nX].node.id);
              this.router.navigateByUrl('/productList');
            }
          }
          nX++;
        }
        if (!lLogUsr) {
          window.alert('Usuário inválido!');
        } else {
          if (!lLogPsw) {
            window.alert('Senha inválida!');
          };
        };

        });
  }
}
