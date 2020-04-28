import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { FormBuilder, CheckboxRequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
profileForm;

 constructor(private cartService: CartService,private formBuilder: FormBuilder,) {
  this.profileForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    company: '',
    mail: '',
    address: '',
    user: '',
    password: '',
  });
 }

  ngOnInit() {

  }

  onSubmit() {

  }


}
