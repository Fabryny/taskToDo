import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarComponent } from './listar/listar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { FormsModule } from '@angular/forms';
import { TaskDoneDirective } from '../shared/driectives/task-done.directive';
import { PRIMENG_IMPORTS } from './primeNg-imports';



@NgModule({
  declarations: [
    ListarComponent,
    CadastrarComponent,
    TaskDoneDirective
  ],
  imports: [
    CommonModule,
    FormsModule,

    ...PRIMENG_IMPORTS
  ],
  exports:[
    ListarComponent,
    CadastrarComponent,
    TaskDoneDirective,

    ...PRIMENG_IMPORTS
  ]
  
})
export class ComponentsModule { }
