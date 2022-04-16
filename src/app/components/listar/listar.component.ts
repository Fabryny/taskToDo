import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Task } from 'src/app/shared/models/task';
import { TaskService } from 'src/app/shared/services/task.service';
/* declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable'); */

declare const require: any;
declare var navigator: any

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

  location: string
  locOption: any;
  latitude: number;
  longitude: number;

  colunas: any[];
  exportColumns: any[];
  constructor(private taskService: TaskService,
              private msg: MessageService) { }

  ngOnInit(): void {
    this.getTasks();
    this.getLocation();

    this.colunas = [
      { field: 'descricao', header: 'Descrição'},
      { field: 'concluida', header: 'Concluida'},
    ]
    this.exportColumns = this.colunas.map(col => ({title: col.header, dataKey: col.field}));
  }

  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
          this.location = `${this.latitude},${this.longitude}`

          this.locOption = {
            center: {lat: this.latitude, lng: this.longitude},
            zoom: 12
        };
      })
    } 
    return ''
  }

  getMap(): string {
  	return "https://www.google.com/maps/search/?api=1&query=" + this.location;
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


  filtrarLista(ev: Event){ 
    this.getTasks();
    const evento = ev.target as HTMLInputElement;

    this.tasks = this.tasks.filter(value => {
      return value.descricao.toLowerCase().includes(evento.value);
     });
    
  }

  exportPdf(){
    
   let DATA: any = document.getElementById('dataTable');

    html2canvas(DATA).then((canvas) => {

      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p','mm', 'a4');
      let position = 0;
  
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('tarefas.pdf')
    })   

  }

  exportPdfPrimeNG(){

    const tasks = this.formatarConcluida(this.tasks);
    
    const jsPDF = require('jspdf');
    require('jspdf-autotable');

    import("jspdf").then(as => {
      import("jspdf-autotable").then(x => {
          const doc = new jsPDF.default(0,0);
          doc.autoTable(this.exportColumns, tasks);
          doc
          doc.save('products.pdf');
          this.getTasks();
      });
    }) ;
  }

  formatarConcluida(itens: Task[]): Task[]{
    itens.forEach(element => {
      element.concluida ? element.concluida = 'Sim' : element.concluida = 'Não';
    });
    return itens;
  }




}