import { Component } from '@angular/core';
import { TaskService } from '../../services/Task/task.service';
import { DynamicDialogRef } from '../../services/DynamicDialog/dynamic-dialog-ref';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {
  constructor(private taskService: TaskService, 
    private readonly dialogRef: DynamicDialogRef,
    private toastr: ToastrService) {}

  onCreate(title: string) {
    try {
      this.taskService.createList(title).subscribe((response: any) => {
        // console.log(response)
      })
      this.dialogRef.close()
      this.toastr.success('Congratulations!', `${title} list has been created!`, {
        closeButton: true,
        timeOut: 10000,
        progressBar: true,
        positionClass: 'toast-top-right'
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
