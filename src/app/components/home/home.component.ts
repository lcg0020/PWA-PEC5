import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Peticiones HTTP a la API de Marvel
import { Router } from '@angular/router'; // Navegar
import { Md5 } from 'ts-md5'; // Generar el hash de autenticación requerido por la API 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  publicKey = '5b75a4e1c00336214e25a61e2c8326be';
  privateKey = '27b61d0a805a906cf0917867cd8c10a46f0d5b25';
  timestamp = new Date().getTime().toString();
  hash = Md5.hashStr(this.timestamp + this.privateKey + this.publicKey); // Código hash para acceder a la API
  apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;

  characters: any[] = []; // Guardar la lista de personajes obtenida de la API
  loading: boolean = true;
  viewMode: 'cards' | 'table' = 'table'; // Para cambiar entre vista de tarjetas y tabla

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void { // Iniciar el componente
    this.fetchCharacters(); // Cargar los personajes
  }

  fetchCharacters(): void { // Cargar los personajes
    this.http.get<any>(this.apiUrl).subscribe(response => { // Solicitud get a la API
      this.characters = response.data.results; // Personajes obtenidos
      this.loading = false;
    }, error => {
      console.error('Error al obtener personajes:', error);
      this.loading = false;
    });
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/detail', id]); // Con router se redirige al detalle de un personaje
  }

  toggleView(): void {
    this.viewMode = this.viewMode === 'cards' ? 'table' : 'cards'; // Alternar entre gridComponent y cardComponent
  }
}
