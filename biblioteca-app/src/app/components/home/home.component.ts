import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <div style="padding: 40px; text-align: center; max-width: 700px; margin: auto;">
      <mat-card style="padding: 32px; border-radius: 12px;" class="mat-elevation-z4">
        <mat-icon style="font-size: 64px; height: 64px; width: 64px; color: #3f51b5; margin-bottom: 16px;">library_books</mat-icon>
        <h1 style="font-size: 28px; margin-bottom: 12px;">Bienvenido a Biblioteca App</h1>
        <p style="color: #666; font-size: 16px; margin-bottom: 24px;">
          Sistema web desarrollado con Angular y Angular Material para la gestión eficiente de libros, stock y control de préstamos.
        </p>
        <button mat-raised-button color="primary" routerLink="/libros" style="padding: 0 24px; font-size: 16px;">
          <mat-icon>menu_book</mat-icon> Ver Listado de Libros
        </button>
      </mat-card>
    </div>
  `
})
export class HomeComponent {}