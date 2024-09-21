import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { dadosForm } from '../models/dadosForm';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar-dados',
  templateUrl: './listar-dados.page.html',
  styleUrls: ['./listar-dados.page.scss'],
})
export class ListarDadosPage implements OnInit {
  segmentValue: string = 'cadastrados';
  produtosAdquiridos: any[] = [];
  produtosNaoAdquiridos: any[] = [];
  id_user: number;
  totalCadastrados: number;
  totalAdquiridos: number;

  constructor(
    public parametroRota: ActivatedRoute,
    public service: ServicesService,
    public rota: Router,
    private toastController: ToastController,
    public alert : AlertController
  ) {}

  ngOnInit() {
    this.parametroRota.params.subscribe((data: any) => {
      this.id_user = data.id_user;
      this.listarProdutos(this.id_user);
    });
  }

  listarProdutos(id: number) {
    this.service
      .listarTodosProdutos(id)
      .then((res: any) => {
        this.produtosAdquiridos = res.adquiridos;
        this.produtosNaoAdquiridos = res.naoAdquiridos;
        this.totalCadastrados = this.calcularTotal(this.produtosNaoAdquiridos);
        this.totalAdquiridos = this.calcularTotal(this.produtosAdquiridos);
      })
      .catch((err) => {
        this.produtosAdquiridos = [];
        this.produtosNaoAdquiridos = [];
        this.totalAdquiridos = 0;
        this.totalCadastrados = 0;
        console.error('Erro ao listar produtos:', err.message);
      });
  }

  calcularTotal(array: any[]) {
    let total: number = 0;
    for (const produto of array) {
      total += produto.quantidade * produto.valor;
    }
    return total;
  }

  alterarEstado(produto : dadosForm) {
    console.log(produto.id)
    if(produto.adquirido == 0) {
      produto.adquirido = 1;
      this.service.editarProduto(produto);
      this.ngOnInit();
      return
    }
    produto.adquirido = 0;
    this.service.editarProduto(produto);
    this.ngOnInit();
  }

  formulario(status: number) {
    this.rota.navigate(['formulario/' + this.id_user + '/' + status]);
  }

  editar(produtoId: number, status: number) {
    this.rota.navigate(['editar-produto/' + produtoId + '/' + status]);
  }

  async alertExcluir(produto : dadosForm){
    const alert = await this.alert.create({
      header: 'Excluir item!',
      message: 'Deseja realmente excluir o item?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Excluir',
          handler: async () => {
            this.service.excluirProduto(produto);
            this.presentToast();
            this.listarProdutos(this.id_user);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Produto deletado com sucesso!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
