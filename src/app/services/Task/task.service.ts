import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

  getLists() {
    this.webRequestService.get('lists').subscribe((lists) => {
      this.getLists$.next(lists)
    })
    return this.getLists$
  }

  getTasks(listId: string) {
    this.webRequestService.get(`lists/${listId}/tasks`).subscribe((tasks) => {
      this.getTasks$.next(tasks)
    })
    return this.getTasks$
  }

  async createTask(title: string, listId: string) {
    let result = await this.webRequestService.post(`lists/${listId}/tasks`, {title}).toPromise()
    this.webRequestService.get(`lists/${listId}/tasks`).subscribe((tasks) => {
      this.getTasks$.next(tasks)
    })
    return result
  }

  async patchTask(title: string, listId: string) {
    let result = await this.webRequestService.post(`lists/${listId}/tasks`, {title}).toPromise()
    this.webRequestService.get(`lists/${listId}/tasks`).subscribe((tasks) => {
      this.getTasks$.next(tasks)
    })
    return result
  }
}
