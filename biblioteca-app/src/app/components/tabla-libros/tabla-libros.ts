import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Libro } from '../../services/libro';

@Component({
  selector: 'app-tabla-libros',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule],
  templateUrl: './tabla-libros.html',
  styleUrls: ['./tabla-libros.scss']
})
export class TablaLibrosComponent {
  displayedColumns: string[] = ['id', 'titulo', 'categoria', 'autor', 'disponibles', 'acciones'];
  dataSource: Libro[] = [];

  @Input()
  set libros(libros: Libro[]) {
    this.dataSource = libros;
  }
}