import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/TaskService/task.service';
import { DynamicDialogConfig } from '../../services/DynamicDialogService/dynamic-dialog.config';
import { DynamicDialogService } from '../../services/DynamicDialogService/dynamic-dialog.service';
import { NewListComponent } from '../new-list/new-list.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { UpdateListComponent } from '../update-list/update-list.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any
  tasks: any
  listId!: string

  constructor(private taskService: TaskService,
    private readonly dynamicDialogService: DynamicDialogService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit() {
    this.taskService.getLists().subscribe(lists => {
      this.lists = lists
      this.route.params.subscribe((params: Params) => {  
        if(!(params['listId'] == undefined)) {
          this.listId = params['listId']
          this.taskService.getTasks(this.listId).subscribe((tasks) => {
            this.tasks = tasks
          })
        } else {
          this.tasks = undefined
        }
      })
    })
  }

  showOverlayCreateList() {
    const dialogConfig = new DynamicDialogConfig("Create a new List");
    dialogConfig.header = NewListComponent.name;
    this.dynamicDialogService.open<string>(NewListComponent, dialogConfig);
  }

  showOverlayUpdateList() {
    const dialogConfig = new DynamicDialogConfig("Update the List");
    dialogConfig.header = UpdateListComponent.name;
    UpdateListComponent.listId = this.listId
    this.dynamicDialogService.open<string>(UpdateListComponent, dialogConfig);
  }

  showOverlayCreateTask() {
    const dialogConfig = new DynamicDialogConfig("Create a new Task");
    dialogConfig.header = NewTaskComponent.name;
    NewTaskComponent.listId = this.listId
    this.dynamicDialogService.open<string>(NewTaskComponent, dialogConfig);
  }

  showOverlayUpdateTask(task: Task) {
    const dialogConfig = new DynamicDialogConfig("Update the Task");
    dialogConfig.header = UpdateTaskComponent.name;
    UpdateTaskComponent.listId = this.listId
    task.completed = !task.completed;
    this.taskService.patchTask(task).then((response: any) => {})
    UpdateTaskComponent.task = task
    this.dynamicDialogService.open<string>(UpdateTaskComponent, dialogConfig);
  }

  onTaskClick(task: Task) {
    task.completed = !task.completed;
    this.taskService.patchTask(task).then((response: any) => {
      // if(task.completed) {
      //   this.toastr.success(
      //     'Congratulations!', `${task.title} task has completed!`, {
      //       closeButton: true,
      //       timeOut: 3000,
      //       positionClass: 'toast-top-right',
      //     })
      // } else {
      //   this.toastr.warning(
      //     '', `${task.title} task is not completed anymore`, {
      //       closeButton: true,
      //       timeOut: 2500,
      //       positionClass: 'toast-top-right',
      //     })
      // }
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.listId).subscribe(() => {
      this.router.navigate(['/lists']).then(() => {
        this.toastr.success(
          '', `List has been deleted!`, {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-top-right',
        })
      })
    })
  }

  onDeleteTaskClick(taskId: string) {
    this.taskService.deleteTask(this.listId, taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task: { _id: string }) => task._id !== taskId)
      this.toastr.success(
        '', `Task has been deleted!`, {
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-top-right',
        })
    })
  }
}
