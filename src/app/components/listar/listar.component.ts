import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  newTaskObj: Task = new 
  Task;
  newTaskDialog: boolean = false;
  tasks: Task[];
  taskSelecionada: Task = new Task;

  colunas: any[];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();

    this.colunas = [
      { field: 'descricao', header: 'Descrição'},

      
    ]
  }

  getTasks(){
    this.tasks = this.taskService.getTasks();
  }



  openNewTask(){
    this.taskSelecionada.id = null
    this.newTaskDialog = true;
  }

  addTask(){
    const element = new Task; 
    element.descricao= this.newTaskObj.descricao;
    this.taskService.newTask(element);

    this.getTasks();
    this.newTaskDialog = false;
  }

  deleteTask(value: Task){
    this.taskService.deleteTask(value.id);
    this.getTasks()
  }

  editTask(value: Task){
    this.taskSelecionada.id = value.id
    this.taskSelecionada.descricao = value.descricao;
    this.taskSelecionada.concluida = value.concluida
    this.newTaskDialog = true;
  }

  updateTask(task: Task){
    this.taskService.update(task); 
    this.getTasks();
    this.newTaskDialog = false;   
  }

  taskDone(task: Task){
    this.taskService.endTask(task); 
  }

}
