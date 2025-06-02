import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() character: any; // Recibe los datos de un personaje desde HomeComponent

  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigate(['/detail', this.character.id]); // Redirige al detalle del personaje
  }
}
