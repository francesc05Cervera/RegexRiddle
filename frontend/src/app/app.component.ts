import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    message = 'Caricamento dal backend...';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        console.log('Chiamata backend in corso...');

        this.http.get<{ message: string }>('/api/test').subscribe({
            next: (data) => {
                console.log('RISPOSTA OK', data);
                this.message = data.message;
                console.log('MESSAGGIO AGGIORNATO', this.message);
            },
            error: (err) => {
                console.error('ERRORE BACKEND', err);
                this.message = 'Errore nel collegamento al backend';
            }
        });
    }
}