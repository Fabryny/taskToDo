import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[taskDone]'
})

export class TaskDoneDirective  implements OnInit  {

  @Input() taskDone: boolean;

  constructor(private el: ElementRef) { }

    ngOnInit(){
      if(this.taskDone){
        this.el.nativeElement.style.textDecoration = "line-through";
      }
   }
   

}
