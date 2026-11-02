import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>📚 Biblioteca App</span>
      <span style="flex: 1 1 auto;"></span>
      <button mat-button routerLink="/libros">Catálogo</button>
      <button mat-button routerLink="/dashboard">Dashboard</button>
    </mat-toolbar>
  `
})
export class NavbarComponent {}