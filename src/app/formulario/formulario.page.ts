import { Component, OnInit } from '@angular/core';
import { dadosForm } from '../models/dadosForm';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  dadosFormulario : dadosForm = {
    id : 0,
    id_user : 0,
    nome : '',
    quantidade : 0,
    valor : 0,
    adquirido : 0
  }
  constructor( public rota : Router, public parametroRota : ActivatedRoute, public service : ServicesService) { }

  ngOnInit() {
    this.parametroRota.params.subscribe((data: any) => {
      this.dadosFormulario.id_user = data.id_user;
      this.dadosFormulario.adquirido = data.status;
      // console.log(this.dadosFormulario.id_user);
      // console.log(this.dadosFormulario.adquirido);
    });
  }

  salvar(form: NgForm) {
    if (form.valid) {
      this.service.inserirProduto(this.dadosFormulario);
      this.dadosFormulario.nome = '';
      this.dadosFormulario.quantidade = 0;
      this.dadosFormulario.valor = 0;
      this.dadosFormulario.adquirido = 0;
      this.rota.navigate(['listar-dados/'+this.dadosFormulario.id_user]);
    }
  }
}
