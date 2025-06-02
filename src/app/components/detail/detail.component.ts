import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Peticiones HTTP a la API de Marvel
import { Md5 } from 'ts-md5'; // Generar el hash de autenticación requerido por la API 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  publicKey = '5b75a4e1c00336214e25a61e2c8326be';
  privateKey = '27b61d0a805a906cf0917867cd8c10a46f0d5b25';
  timestamp = new Date().getTime().toString();
  hash = Md5.hashStr(this.timestamp + this.privateKey + this.publicKey); // Código hash para acceder a la API
  
  character: any;
  loading: boolean = true;
  showDetails: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el id del personaje
    if (id) {
      this.fetchCharacterDetail(id);
    }
  }

  fetchCharacterDetail(id: string): void { // Llamar a la API para cargar los detalles del personaje
    const apiUrl = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${this.hash}`;
    
    this.http.get<any>(apiUrl).subscribe(response => {
      this.character = response.data.results[0];
      this.loading = false;
    }, error => {
      console.error('Error al obtener detalles del personaje:', error);
      this.loading = false;
    });
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails; // Alternar la visibilidad del Expansion Panel
  }
}
