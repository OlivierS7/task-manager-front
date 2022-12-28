import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  registerForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
   this.createForm();
  }

  createForm() {
   this.registerForm = this.formBuilder.group({
    emailCtrl: ['', [Validators.required, Validators.email]],
    passwordCtrl: ['', [Validators.required, Validators.required]],
   });
  }

  get form() {
    return this.registerForm.controls
  }

  register() {
    console.log(this.registerForm.value);
  }
}
