import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/AuthService/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
   this.createForm();
  }

  createForm() {
   this.loginForm = this.formBuilder.group({
    emailCtrl: [''],
    passwordCtrl: ['', [Validators.required]],
   });
  }

  get form() {
    return this.loginForm.controls
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      
      this.router.navigate(['/lists']).then(() => {
        this.toastr.success(
          '', `Connected!`, {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-top-right',
        })
      })
    })
  }
}
