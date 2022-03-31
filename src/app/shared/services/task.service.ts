import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  
  getTasks(): Task[] {
    const tasks = localStorage['Tasks'];
    return  tasks ? JSON.parse(tasks) : [];
  }

  newTask(task: Task){  
    const tasks = this.getTasks();

    task.id = new Date().getTime();
    tasks.push(task);
   
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }

  deleteTask(id: number){  
    let tasks = this.getTasks();

    tasks = tasks.filter( x => x.id !== id);
   
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }

  update(task: Task){  
    const tasks = this.getTasks();

    tasks.forEach((value) => {
        if(value.id === task.id){
          value.descricao = task.descricao;
        };
    });
    
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }
   
  endTask(task: Task){  
    const tasks = this.getTasks();

    tasks.forEach((value) => {
        if(value.id === task.id){
          value.concluida = task.concluida;
        };
    });
    
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }
}
