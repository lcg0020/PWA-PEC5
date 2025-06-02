import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() characters: any[] = []; // Recibe los personajes de HomeComponent

  displayedColumns: string[] = ['image', 'name', 'description', 'details']; // Columnas de la tabla

  constructor(private router: Router) {}

  navigateToDetail(id: number): void {
    this.router.navigate(['/detail', id]); // Redirige al detalle del personaje
  }
}