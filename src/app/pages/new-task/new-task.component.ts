import { Component} from '@angular/core';
import { TaskService } from '../../services/Task/task.service';
import { DynamicDialogRef } from '../../services/DynamicDialog/dynamic-dialog-ref';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  static listId: any;

  constructor(
    private taskService: TaskService,
    private readonly dialogRef: DynamicDialogRef,
    private toastr: ToastrService,
    private router: Router) {}

  onCreate(title: string) {
    try {
      this.taskService.createTask(title, NewTaskComponent.listId).then((response: any) => {
          this.dialogRef.close();
          this.router.navigate(['/lists', NewTaskComponent.listId]).then(() => {
            this.toastr.success(
              'Congratulations!', `${title} task has been created!`, {
                closeButton: true,
                timeOut: 10000,
                progressBar: true,
                positionClass: 'toast-top-right',
              })
          })
        })
    } catch (error) {
      this.toastr.error(`Something goes wrong... Try again!`, 'Error!', {
        closeButton: true,
        timeOut: 10000,
        progressBar: true,
        positionClass: 'toast-top-right',
      });
    }
  }
}
