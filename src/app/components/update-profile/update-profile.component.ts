import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  user: User = new User;
  errorMessage!: any[];
  constructor(
    private authService: AuthService, 
    private toastr: ToastrService) {
      this.user.firstName = this.authService.getFirstName()
      this.user.lastName= this.authService.getLastName()
      this.user.email = this.authService.getEmail()
    }

  async onUpdate(firstName: string, lastName: string, email: string) {
    try {
      this.user.firstName = firstName;
      this.user.lastName = lastName;
      this.user.email = email;
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
    } catch (error) {
      this.toastr.error(`Something goes wrong... Try again!`, 'Error!', {
        closeButton: true,
        timeOut: 10000,
        progressBar: true,
        positionClass: 'toast-top-right'
      })
    }
  }
}
