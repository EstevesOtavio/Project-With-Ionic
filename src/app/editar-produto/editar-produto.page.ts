import { Component, OnInit } from '@angular/core';
import { dadosForm } from '../models/dadosForm';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {

  produto: dadosForm;

  constructor(public param : ActivatedRoute,
              public service : ServicesService,
              public rota : Router,
              public toast : ToastController) { }

  ngOnInit() {
    const id_produto = this.param.snapshot.params['id_produto'];
    const status = this.param.snapshot.params['status'];
    this.produto = this.service.retornarProduto(id_produto, status);
  }

  salvar(form : NgForm) {
    this.service.editarProduto(this.produto).then((res: any) => {
      console.log(this.produto);
      if (res.ok) {
        console.log('Produto atualizado com sucesso!');
        this.rota.navigate(['listar-dados/'+this.produto.id_user]);
      } else {
        console.error('Erro ao atualizar o produto:', res.message);
      }
    });
  }

}
