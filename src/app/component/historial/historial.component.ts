import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements OnInit {
  gestiones: any[] = [];

  ngOnInit(): void {
    this.loadGestiones();
  }

  loadGestiones(): void {
    if (typeof localStorage !== 'undefined') {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        // Parsear los datos almacenados como un arreglo
        const parsedData = JSON.parse(storedData);
        this.gestiones = Array.isArray(parsedData) ? parsedData : [parsedData];
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
    }
  }
}