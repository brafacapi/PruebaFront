import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { GestionesComponent } from './component/gestiones/gestiones.component';
import { HistorialComponent } from './component/historial/historial.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./component/inicio/inicio.component').then(m => m.InicioComponent)
  }
]
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
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
