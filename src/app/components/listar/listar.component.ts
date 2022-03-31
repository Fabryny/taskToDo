import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  data: any;    
  options: any;
  
  newTaskObj: Task = new Task;
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
    this.getData();
  }

  getData(){
    let toDo: number = 0;
    let done: number = 0;

    this.tasks.forEach(element => {
      element.concluida ? toDo += 1 : done += 1;
    });

    this.data = {
      labels: ['Concluída', 'A fazer'],
      datasets: [
          {
              label: 'First Dataset',
              data: [toDo, done],    
               backgroundColor: [
                "#b1dfb1 ",
                "#dfb1b1 ",
           
            ],
            hoverBackgroundColor: [
                "#81C784",
                "#f66464",
            ]
          }
      ]
    };

 

    this.options = {
      plugins: {      
        tooltip: {
          enabled: false
        },
        datalabels: {
      /*     borderRadius: 4,
          backgroundColor: "#00000078", */

          formatter: function(value, context) {
            if(value>0){

              return value
            } else {
              return null
            }
        },
        
          color: 'black',
          font: {
            weight: 'bold',
            size: 16
          }
        },
      
      title: {
          display: true,
          text: 'Tasks',
          fontSize: 16
      },
      legend: {
          position: 'bottom'
      }
  }
    };
  }

  openNewTask(){
    this.taskSelecionada.id = null;
    this.newTaskObj.descricao = ''
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
    this.getTasks();
  }

    update(event: Event) {

  }

}
