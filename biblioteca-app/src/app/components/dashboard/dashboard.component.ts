import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BibliotecaService } from '../../services/biblioteca.service';
import { Libro } from '../../models/libro.model';

// Importación oficial de Chart.js
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div style="padding: 24px; max-width: 1100px; margin: auto;">
      <h2 style="margin-bottom: 24px;">Panel de Control Directivo (Dashboard)</h2>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 24px;">
        <!-- Tarjeta 1: Gráfico de Barras -->
        <mat-card style="padding: 20px;">
          <h3>Inventario por Categoría</h3>
          <div style="position: relative; height: 300px;">
            <canvas #barCanvas></canvas>
          </div>
        </mat-card>

        <!-- Tarjeta 2: Gráfico de Dona -->
        <mat-card style="padding: 20px;">
          <h3>Estado de Salud del Catálogo</h3>
          <div style="position: relative; height: 300px;">
            <canvas #doughnutCanvas></canvas>
          </div>
        </mat-card>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef<HTMLCanvasElement>;

  libros: Libro[] = [];
  barChart: any;
  doughnutChart: any;

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit(): void {
    this.bibliotecaService.getLibros().subscribe(data => {
      this.libros = data;
    });
  }

  ngAfterViewInit(): void {
    this.renderizarGraficos();
  }

  renderizarGraficos(): void {
    const categorias = ['Programación', 'Bases de Datos', 'Redes', 'Ciencias Básicas'];
    
    const stockPorCategoria = categorias.map(cat => {
      return this.libros
        .filter(libro => libro.categoria === cat)
        .reduce((total, libro) => total + libro.stock, 0);
    });

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: categorias,
        datasets: [{
          label: 'Unidades Disponibles',
          data: stockPorCategoria,
          backgroundColor: '#3f51b5'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });


    const stockCritico = this.libros.filter(l => l.stock < 10).length;
    const stockSaludable = this.libros.filter(l => l.stock >= 10).length;

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Stock Crítico (< 10 unidades)', 'Stock Saludable (>= 10 unidades)'],
        datasets: [{
          data: [stockCritico, stockSaludable],
          backgroundColor: ['#f44336', '#4caf50']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}