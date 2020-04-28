import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CartService } from './cart.service';
import { HttpService } from './http.service';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { GraphQLModule } from './graphql.module';

@NgModule({
  imports: [
    BrowserModule,

    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'productList', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'perfil', component: PerfilComponent },
    ]),
    GraphQLModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BottomBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    LoginComponent,
    PerfilComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [CartService,HttpService]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
