import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { DynamicDialogRef } from 'src/app/services/DynamicDialogService/dynamic-dialog-ref';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  static user: User;
  errorMessage!: any[];
  constructor(
    private authService: AuthService, 
    private readonly dialogRef: DynamicDialogRef,
    private toastr: ToastrService) {}

  async onUpdate(firstName: string, lastName: string, email: string) {
    try {
      (await this.authService.patchUser(firstName, lastName, email)).subscribe((result) => {   
        for(const key of Object.keys(result)) {
          if(key === 'error') {
            this.errorMessage = Object.keys(result).map(key => result[key as keyof typeof result])
            this.toastr.error(`Wrong... Try again!`, 'Error!', {
              closeButton: true,
              timeOut: 10000,
              progressBar: true,
              positionClass: 'toast-top-right'
            })
          } else {
            this.dialogRef.close()
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
