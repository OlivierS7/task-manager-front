import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/services/Task/task.service';
import { DynamicDialogConfig } from '../../services/DynamicDialog/dynamic-dialog.config';
import { DynamicDialogService } from '../../services/DynamicDialog/dynamic-dialog.service';
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
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {  
      if(!(params['listId'] == undefined)) {
        this.listId = params['listId']
        this.taskService.getTasks(this.listId).subscribe((tasks) => {
          this.tasks = tasks
        })
      }
    })

    this.taskService.getLists().subscribe(lists => {
      this.lists = lists
      this.cdr.detectChanges()
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
}
