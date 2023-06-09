import { Component } from '@angular/core';
import { Comentario } from 'src/app/models/Comentario';
import { ThemeService } from '../theme.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
})
export class ThemeComponent {
  public listaItems: Comentario[];
  public idUsuario = sessionStorage.getItem('usuario');
  
  temaForm = this.fb.group({
    comentario: [null, Validators.required],
    usuario: [this.idUsuario]
  });

private urlApi = 'http://localhost:8080/tema/';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: ThemeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
    
    this.listaItems = []
    let id = this.route.snapshot.paramMap.get('id');
    this.getItems(id);
    
  }

  onSubmit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.http
      .post<any>(this.urlApi + id, {
        comentario: this.temaForm.value.comentario,
        usuario: this.temaForm.value.usuario
      })
      .subscribe(() => {
        this.router.navigate([`tema/${id}`]);
      });
  }

  getItems(id: string | null): void {
    this.service.getAll(id).subscribe((data) => (this.listaItems = data));
  }
}
