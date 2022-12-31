import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogRef } from 'src/app/services/DynamicDialogService/dynamic-dialog-ref';
import { TaskService } from 'src/app/services/TaskService/task.service';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss']
})
export class UpdateListComponent {
  constructor(
    private taskService: TaskService, 
    private readonly dialogRef: DynamicDialogRef,
    private toastr: ToastrService) {}

    static listId: string;

  onUpdate(title: string) {
    try {
      this.taskService.updateList(title, UpdateListComponent.listId).then(() => {                
        this.dialogRef.close()
        this.toastr.success('Congratulations!', `${title} list has been updated!`, {
          closeButton: true,
          timeOut: 10000,
          progressBar: true,
          positionClass: 'toast-top-right'
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
