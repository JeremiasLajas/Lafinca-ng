import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RegistroService } from '../../servicios/registros.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'acciones'];

  constructor(
    private registrosService: RegistroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registrosService.getRegistros()
      .subscribe(
        (res: any) => { this.usuarios = res; },
        (error) => { console.error(error); }
      );
  }

  eliminarRegistro(id: any, nombre: string): void {
    let respuesta = confirm(`¿Desea eliminar a ${nombre}?`);
    if (respuesta) {
      if (respuesta) {
        this.registrosService.eliminarRegistro(id);
        alert('Cliente eliminado!');
        this.router.navigate(['/lista-usuarios']);
      };
    }
  }
}
