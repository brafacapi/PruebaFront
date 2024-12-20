import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { EditarComponent } from './component/editar/editar.component';
import { GestionesComponent } from './component/gestiones/gestiones.component';
import { HistorialComponent } from './component/historial/historial.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  /*path:*/
]


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    EditarComponent,
    GestionesComponent,
    HistorialComponent,
    FormsModule,
    CommonModule
    /*RouterModule.forRoot(routes)*/

  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PruebaFront';
}
