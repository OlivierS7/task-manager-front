import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { DynamicDialogRef } from 'src/app/services/DynamicDialogService/dynamic-dialog-ref';
import { TaskService } from 'src/app/services/TaskService/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {
  constructor(
    private taskService: TaskService, 
    private readonly dialogRef: DynamicDialogRef,
    private toastr: ToastrService,) {}

    static listId: string;
    static task: Task;

  onUpdate(title: string) {
    try {
      UpdateTaskComponent.task.title = title 
      this.taskService.patchTask(UpdateTaskComponent.task).then(() => {      
        this.dialogRef.close()
        this.toastr.success('', `${title} task has been updated!`, {
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
