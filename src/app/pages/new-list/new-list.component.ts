import { Component } from '@angular/core';
import { TaskService } from '../../services/Task/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {
  constructor(private taskService: TaskService) {}

  onCreate(title: string) {
    this.taskService.createList('TestList').subscribe((response: any) => {
      console.log(response)
    })
  }
  onClose() {
    
  }
}
