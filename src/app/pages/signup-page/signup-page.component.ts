import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) {
   this.createForm();
  }

  createForm() {
   this.signupForm = this.formBuilder.group({
    firstNameCtrl: ['', [Validators.required]],
    lastNameCtrl: ['', [Validators.required]],
    emailCtrl: ['', [Validators.required, Validators.email]],
    passwordCtrl: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
    passwordVerificationCtrl: ['', [Validators.required]],
   });
  }

  get form() {
    return this.signupForm.controls
  }

  onSignupButtonClicked(firstName: string, lastName: string, email: string, password: string) {
    this.authService.signup(firstName, lastName, email, password).subscribe((res: HttpResponse<any>) => {})
  }
}
