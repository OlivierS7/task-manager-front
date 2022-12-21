import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DynamicDialogConfig } from '../../services/DynamicDialog/dynamic-dialog.config';
import { DynamicDialogService } from '../../services/DynamicDialog/dynamic-dialog.service';
import { NewListComponent } from '../new-list/new-list.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  constructor(private readonly dynamicDialogService: DynamicDialogService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      
    })
  }
  showOverlay() {
    const dialogConfig = new DynamicDialogConfig("Create a new List");
    dialogConfig.header = NewListComponent.name;
    this.dynamicDialogService.open<string>(NewListComponent, dialogConfig);
  }
}
