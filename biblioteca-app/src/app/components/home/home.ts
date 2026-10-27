import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LibroService, Libro } from '../../services/libro';
import { TablaLibrosComponent } from '../tabla-libros/tabla-libros';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    TablaLibrosComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  libros: Libro[] = [];
  categoriaSeleccionada: string = 'Todas';
  categorias: string[] = [
    'Todas',
    'Programación',
    'Bases de Datos',
    'Redes',
    'Ciencias Básicas'
  ];

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.libros = this.libroService.obtenerTodos();
  }

  filtrarLibros(): void {
    this.libros = this.libroService.filtrarPorCategoria(this.categoriaSeleccionada);
  }
}