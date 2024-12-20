import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./component/inicio/inicio.component').then(m => m.InicioComponent) 
    },
    {
        path: 'Inicio',
        loadComponent:() => import('./component/inicio/inicio.component').then(m => m.InicioComponent) 
    },
    {
        path: 'Gestiones',
        loadComponent:() => import('./component/gestiones/gestiones.component').then(m => m.GestionesComponent) 
    },
    {
        path: 'Historial',
        loadComponent:() => import('./component/historial/historial.component').then(m => m.HistorialComponent) 
    },
    {
        path: 'Editar',
        loadComponent:() => import('./component/editar/editar.component').then(m => m.EditarComponent) 
    }
];
