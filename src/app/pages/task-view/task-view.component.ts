import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/Task/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  constructor(private taskService: TaskService) {

  }

  ngOnInit() {

  }
  createNewList() {
    this.taskService.createList('TestList').subscribe((response: any) => {
      console.log(response)
    })
  }
}
