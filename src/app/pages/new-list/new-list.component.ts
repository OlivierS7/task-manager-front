import { Component } from '@angular/core';
import { TaskService } from '../../services/TaskService/task.service';
import { DynamicDialogRef } from '../../services/DynamicDialogService/dynamic-dialog-ref';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {
  constructor(
    private taskService: TaskService, 
    private readonly dialogRef: DynamicDialogRef,
    private toastr: ToastrService,
    private router: Router) {}

  onCreate(title: string) {
    try {
      this.taskService.createList(title).then((response: any) => {          
        this.dialogRef.close()
        this.router.navigate(['/lists', response._id]).then(() => {
          this.toastr.success('Congratulations!', `${title} list has been created!`, {
            closeButton: true,
            timeOut: 10000,
            progressBar: true,
            positionClass: 'toast-top-right'
          })
        })
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
