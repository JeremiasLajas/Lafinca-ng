import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RecibosService } from '../../servicios/recibos.service';

@Component({
  selector: 'app-lista-recibos',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './lista-recibos.component.html',
  styleUrl: './lista-recibos.component.css'
})
export class ListaRecibosComponent {
  recibos: any[] = [];
  displayedColumns: string[] = ['id', 'fecha', 'titulo', 'monto', 'cliente', 'detalle'];

  constructor(
    private recibosService: RecibosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.recibosService.getVtaRecibos()
      .subscribe(
        (res: any) => { this.recibos = res; },
        (error) => { console.error(error); }
      );
  }

  eliminarRecibo(id: any): void {
    let respuesta = confirm(`¿Desea eliminar el recibo Nº ${id}?`);
    if (respuesta) {
      this.recibosService.eliminarRecibo(id).subscribe(() => {
        this.recibos = this.recibos.filter(recibo => recibo.id !== id);
        alert('Usuario eliminado!');
      });
    }
  }
}
