import { Routes } from '@angular/router';
import { LibroListComponent } from './components/libro-list/libro-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'libros', component: LibroListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];