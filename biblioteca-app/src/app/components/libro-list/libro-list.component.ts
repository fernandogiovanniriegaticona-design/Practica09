import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule
  ],
  template: `
    <div style="padding: 24px; max-width: 900px; margin: auto;">
      <h2>Gestión de Biblioteca - Listado de Libros</h2>

      <!-- Formulario simple para agregar libros -->
      <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
        <h3>Registrar Nuevo Libro</h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px;">
          <mat-form-field appearance="outline" style="flex: 1; min-width: 200px;">
            <mat-label>Título</mat-label>
            <input matInput [(ngModel)]="nuevoLibro.titulo" placeholder="Ej. El Quijote">
          </mat-form-field>

          <mat-form-field appearance="outline" style="flex: 1; min-width: 200px;">
            <mat-label>Autor</mat-label>
            <input matInput [(ngModel)]="nuevoLibro.autor" placeholder="Ej. Miguel de Cervantes">
          </mat-form-field>

          <mat-form-field appearance="outline" style="width: 120px;">
            <mat-label>Stock</mat-label>
            <input matInput type="number" [(ngModel)]="nuevoLibro.stock">
          </mat-form-field>
        </div>

        <button mat-raised-button color="primary" (click)="guardarLibro()">
          <mat-icon>save</mat-icon> Guardar Libro
        </button>
      </div>

      <!-- Tabla de Listado -->
      <table mat-table [dataSource]="libros" class="mat-elevation-z8" style="width: 100%;">
        <!-- Título -->
        <ng-container matColumnDef="titulo">
          <th mat-header-cell *matHeaderCellDef> Título </th>
          <td mat-cell *matCellDef="let element"> {{element.titulo}} </td>
        </ng-container>

        <!-- Autor -->
        <ng-container matColumnDef="autor">
          <th mat-header-cell *matHeaderCellDef> Autor </th>
          <td mat-cell *matCellDef="let element"> {{element.autor}} </td>
        </ng-container>

        <!-- Stock -->
        <ng-container matColumnDef="stock">
          <th mat-header-cell *matHeaderCellDef> Stock </th>
          <td mat-cell *matCellDef="let element"> {{element.stock}} </td>
        </ng-container>

        <!-- Acciones -->
        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef> Acciones </th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button color="warn" (click)="eliminar(element.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class LibroListComponent implements OnInit {
  libros: Libro[] = [];
  displayedColumns: string[] = ['titulo', 'autor', 'stock', 'acciones'];

  // Objeto temporal para el formulario
  nuevoLibro: Libro = {
    titulo: '',
    autor: '',
    isbn: '978-0000000000',
    stock: 1,
    categoria: 'General'
  };

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros() {
    this.bibliotecaService.getLibros().subscribe(data => this.libros = [...data]);
  }

  guardarLibro() {
    if (!this.nuevoLibro.titulo || !this.nuevoLibro.autor) {
      alert('Por favor completa al menos el título y el autor.');
      return;
    }

    this.bibliotecaService.agregarLibro({...this.nuevoLibro}).subscribe(() => {
      this.cargarLibros();
      // Limpiar formulario
      this.nuevoLibro = { titulo: '', autor: '', isbn: '978-0000000000', stock: 1, categoria: 'General' };
    });
  }

  eliminar(id?: number) {
    if (id !== undefined) {
      this.bibliotecaService.eliminarLibro(id).subscribe(() => {
        this.cargarLibros();
      });
    }
  }
}