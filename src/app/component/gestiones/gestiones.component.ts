import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Gestion {
    alerta: string;
    tipoGestion: string;
    detalleGestion: string;
    resumenGestion: string;
}
@Component({
    selector: 'app-gestiones',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule
    ],
    templateUrl: './gestiones.component.html',
    styleUrls: ['./gestiones.component.scss']
})

export class GestionesComponent {
    @Output() formSubmitted = new EventEmitter<Gestion>();

    alerta: string = '';
    tipoGestion: string = '';
    detalleGestion: string = '';
    resumenGestion: string = '';

    gestiones: Gestion[] = [];

    cargarGestiones() {
        const gestionesGuardadas = localStorage.getItem('gestiones');
        this.gestiones = gestionesGuardadas ? JSON.parse(gestionesGuardadas) : [];
    }



    
    // Opciones principales
    tipoGestionOptions = ['Buena', 'Pendiente', 'Fraude'];

    // Opciones detalladas dinámicas
    detalleGestionOptions: string[] = [];

    // Opciones de detalle predefinidas
    detalleGestionBuena = ['Buena sin contacto', 'Cliente confirma'];
    detalleGestionPendiente = ['Sin contacto', 'Llamar más tarde'];
    detalleGestionFraude = ['Cliente no reconoce', 'Similitud con fraude confirmado'];

    // Método para actualizar las opciones de detalleGestion
    onTipoGestionChange(): void {
        switch (this.tipoGestion) {
            case 'Buena':
                this.detalleGestionOptions = this.detalleGestionBuena;
                break;
            case 'Pendiente':
                this.detalleGestionOptions = this.detalleGestionPendiente;
                break;
            case 'Fraude':
                this.detalleGestionOptions = this.detalleGestionFraude;
                break;
            default:
                this.detalleGestionOptions = [];
                break;
        }

        // Reiniciar el valor de detalleGestion si cambia el tipo
        this.detalleGestion = '';
    }

    // Método para enviar el formulario
    onSubmit(): void {
        const formData: Gestion = {
            alerta: this.alerta,
            tipoGestion: this.tipoGestion,
            detalleGestion: this.detalleGestion,
            resumenGestion: this.resumenGestion
        };
        // Añadir la nueva gestión al array
        this.gestiones.push(formData);

        
        // Concatenar todos los valores separados por espacio
        const concatenatedText = `Para la aleta: ${this.alerta} Gestión:${this.tipoGestion}, Detalle: ${this.detalleGestion}, Se resumen:  ${this.resumenGestion}`;
        // Guardar el array actualizado en localStorage
        localStorage.setItem('gestiones', JSON.stringify(this.gestiones));
        // Mostrar el texto concatenado en una alerta
        alert(`Gestion Realizada: ${concatenatedText}`);
        // Guardar datos en el localStorage
        localStorage.setItem('formData', JSON.stringify(this.gestiones));

        // Emitir los datos a través de un evento
        this.formSubmitted.emit(formData);

        // Limpiar los campos después de enviar el formulario
        this.alerta = '';
        this.tipoGestion = '';
        this.detalleGestion = '';
        this.resumenGestion = '';
        this.detalleGestionOptions = [];
    }
}
