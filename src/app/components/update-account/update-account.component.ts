import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent {
  user: User = new User;
  errorMessage!: any[];
  constructor( private authService: AuthService, private toastr: ToastrService) {
    this.user.email = this.authService.getEmail()
  }

  async onUpdate(oldPassword: string, newPassword: string) {
    this.authService.verifyLogin(this.user.email, oldPassword).subscribe(async (r) => {
      this.user.password = newPassword;
      (await this.authService.patchUser(this.user)).subscribe((result) => {   
        for(const key of Object.keys(result)) {
          if(key === 'error') {
            this.errorMessage = Object.keys(result).map(key => result[key as keyof typeof result])
            // Get the array of errors and not an object
            this.errorMessage = this.errorMessage[0]
            this.toastr.error(`Wrong... Try again!`, 'Error!', {
              closeButton: true,
              timeOut: 10000,
              progressBar: true,
              positionClass: 'toast-top-right'
            })
          } else {
            this.errorMessage = []
            this.toastr.success('', `Your profile has been updated!`, {
              closeButton: true,
              timeOut: 10000,
              progressBar: true,
              positionClass: 'toast-top-right'
            })
          }
        }
      })
    },
    (error) => {
      this.errorMessage = ['Old password isn\'t valid']
      this.toastr.error(`Something goes wrong... Try again!`, 'Error!', {
        closeButton: true,
        timeOut: 10000,
        progressBar: true,
        positionClass: 'toast-top-right'
      })
    });     
  }
}
