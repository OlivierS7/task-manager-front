import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from '../../library/dynamic-dialog/dynamic-dialog.config';
import { DynamicDialogService } from '../../library/dynamic-dialog/dynamic-dialog.service';
import { TaskService } from '../../services/Task/task.service';
import { NewListComponent } from '../new-list/new-list.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  constructor(private readonly dynamicDialogService: DynamicDialogService) {}

  ngOnInit() {

  }
  showOverlay() {
    const dialogConfig = new DynamicDialogConfig("Create a new List");
    dialogConfig.header = NewListComponent.name;
    this.dynamicDialogService.open<string>(NewListComponent, dialogConfig);
  }
}
