import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private libros: Libro[] = [
    { id: 1, titulo: 'Clean Code', autor: 'Robert C. Martin', isbn: '978-0132350884', stock: 15, categoria: 'Programación' },
    { id: 2, titulo: 'Design Patterns', autor: 'Erich Gamma', isbn: '978-0201633610', stock: 8, categoria: 'Programación' },
    { id: 3, titulo: 'SQL Queries for Mere Mortals', autor: 'John Viescas', isbn: '978-0134858333', stock: 12, categoria: 'Bases de Datos' },
    { id: 4, titulo: 'Learning SQL', autor: 'Alan Beaulieu', isbn: '978-1492057611', stock: 4, categoria: 'Bases de Datos' },
    { id: 5, titulo: 'Computer Networking', autor: 'Kurose & Ross', isbn: '978-0133594140', stock: 6, categoria: 'Redes' },
    { id: 6, titulo: 'Cálculo de una Variable', autor: 'James Stewart', isbn: '978-6075265506', stock: 20, categoria: 'Ciencias Básicas' }
  ];

  getLibros(): Observable<Libro[]> {
    return of(this.libros);
  }

  agregarLibro(libro: Libro): Observable<Libro> {
    libro.id = this.libros.length + 1;
    this.libros.push(libro);
    return of(libro);
  }

  eliminarLibro(id: number): Observable<boolean> {
    this.libros = this.libros.filter(l => l.id !== id);
    return of(true);
  }
}