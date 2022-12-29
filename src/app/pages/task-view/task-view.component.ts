import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/TaskService/task.service';
import { DynamicDialogConfig } from '../../services/DynamicDialogService/dynamic-dialog.config';
import { DynamicDialogService } from '../../services/DynamicDialogService/dynamic-dialog.service';
import { NewListComponent } from '../new-list/new-list.component';
import { NewTaskComponent } from '../new-task/new-task.component';

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
    private toastr: ToastrService) {}

  ngOnInit() {
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

    this.taskService.getLists().subscribe(lists => {
      this.lists = lists
    })
  }

  showOverlayList() {
    const dialogConfig = new DynamicDialogConfig("Create a new List");
    dialogConfig.header = NewListComponent.name;
    this.dynamicDialogService.open<string>(NewListComponent, dialogConfig);
  }

  showOverlayTask() {
    const dialogConfig = new DynamicDialogConfig("Create a new Task");
    dialogConfig.header = NewTaskComponent.name;
    NewTaskComponent.listId = this.listId
    this.dynamicDialogService.open<string>(NewTaskComponent, dialogConfig);
  }

  onTaskClick(task: Task) {
    task.completed = !task.completed;
    this.taskService.patchTask(task).then((response: any) => {
      if(task.completed) {
        this.toastr.success(
          'Congratulations!', `${task.title} task has completed!`, {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-top-right',
          })
      } else {
        this.toastr.warning(
          '', `${task.title} task is not completed anymore`, {
            closeButton: true,
            timeOut: 2500,
            positionClass: 'toast-top-right',
          })
      }
    })
  }
}
