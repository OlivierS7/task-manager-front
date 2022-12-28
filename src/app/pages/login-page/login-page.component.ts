import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
   this.createForm();
  }

  createForm() {
   this.loginForm = this.formBuilder.group({
    emailCtrl: ['', [Validators.required, Validators.email]],
    passwordCtrl: ['', [Validators.required, Validators.required]],
   });
  }

  get form() {
    return this.loginForm.controls
  }

  login() {
    console.log(this.loginForm.value);
  }
}
