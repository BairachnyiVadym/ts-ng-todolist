import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

const STORAGE_KEY = 'local-todolist';

@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(taskTitle = '', identifier): void {
    if (taskTitle === undefined || taskTitle === '') { return; }

    const currentTodoList = this.storage.get(STORAGE_KEY) || [];

    currentTodoList.push({title: taskTitle, isDone: false, id: identifier});

    this.storage.set(STORAGE_KEY, currentTodoList);
  }

  public removeFromLocalStorage(identifier): void {
    const currentTodoList = this.storage.get(STORAGE_KEY);

    const index = currentTodoList.findIndex(todo => todo.id === identifier);

    currentTodoList.splice(index, 1);

    this.storage.set(STORAGE_KEY, currentTodoList);
  }

  public toggleIsDoneVal(collection): void {
    this.storage.set(STORAGE_KEY, collection);
  }
}
