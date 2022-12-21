import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/services/Task/task.service';
import { DynamicDialogConfig } from '../../services/DynamicDialog/dynamic-dialog.config';
import { DynamicDialogService } from '../../services/DynamicDialog/dynamic-dialog.service';
import { NewListComponent } from '../new-list/new-list.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any
  tasks: any

  constructor(private taskService: TaskService,
    private readonly dynamicDialogService: DynamicDialogService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {    
      if(!(params['listId'] == undefined)) {
        this.taskService.getTasks(params['listId']).subscribe((tasks) => {
          this.tasks = tasks
        })
      }
    })

    this.taskService.getLists().subscribe(lists => {
      this.lists = lists  
    })
  }
  showOverlay() {
    const dialogConfig = new DynamicDialogConfig("Create a new List");
    dialogConfig.header = NewListComponent.name;
    this.dynamicDialogService.open<string>(NewListComponent, dialogConfig);
  }
}
