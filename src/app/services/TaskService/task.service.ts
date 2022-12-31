import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { WebRequestService } from '../WebService/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private getLists$ = new Subject()
  private getTasks$ = new Subject()

  constructor(private webRequestService: WebRequestService) {}

  async createList(title: string) {
    let result = await this.webRequestService.post('lists', {title}).toPromise()
    this.webRequestService.get('lists').subscribe((lists) => {
      this.getLists$.next(lists)
    })
    return result
  }

  async updateList(title: string, listId: string) {
    this.webRequestService.patch(`lists/${listId}`, {title}).subscribe(result => {
      this.webRequestService.get('lists').subscribe((lists) => {
        this.getLists$.next(lists)
      })
      return result
    })
  }

  getLists() {
    this.webRequestService.get('lists').subscribe((lists) => {
      this.getLists$.next(lists)
    })
    return this.getLists$
  }

  deleteList(listId: string) {
    return this.webRequestService.delete(`lists/${listId}`);
  }

  getTasks(listId: string) {
    this.webRequestService.get(`lists/${listId}/tasks`).subscribe((tasks) => {
      this.getTasks$.next(tasks)
    })
    return this.getTasks$
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`)
  }

  async createTask(title: string, listId: string) {
    let result = await this.webRequestService.post(`lists/${listId}/tasks`, {title}).toPromise()
    this.webRequestService.get(`lists/${listId}/tasks`).subscribe((tasks) => {
      this.getTasks$.next(tasks)
    })
    return result
  }

  async patchTask(task: Task) {
  return await this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, task).subscribe(() => {})}
}
