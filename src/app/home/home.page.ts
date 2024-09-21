import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { dadosUser } from 'src/app/models/dadosUser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  segmentValue: string = 'login';

  user: dadosUser = {
    id: 0,
    nome: '',
    email: '',
    senha: ''
  };

  confirmarSenha : string;

  constructor(public servico : ServicesService, public rota : Router, private toastController: ToastController, public alert : AlertController) {}

  ngOnInit() {}

  login(form: NgForm) {
    this.servico.realizarLogin(this.user).then((res: any) => {
      console.log(res);
      if (res.ok) {
        console.log('Login realizado com sucesso!');
        // Armazenar informações do usuário e redirecionar para a página inicial
        this.user = res.result;
        this.rota.navigate(['listar-dados/'+this.user.id])
        // this.rota.navigate(['listar-dados']);
      } else {
        console.error('Erro ao fazer login:', res.message);
        // Exibir mensagem de erro na interface
      }
    });
  }

  cadastrar(form: NgForm) {
    if (this.user.senha !== this.confirmarSenha) {
      console.error('As senhas não coincidem');
      return;
    }
  
    this.servico.cadastrarUsuario(this.user).then((res: any) => {
      console.log(res);
      if (res.ok) {
        console.log('Usuário cadastrado com sucesso!');
        // Redirecionar ou exibir mensagem de sucesso
        this.user.nome = '';
        this.user.senha = '';
        this.user.email = '';
        this.confirmarSenha = '';
        this.segmentValue = 'login';
      } else {
        console.error('Erro ao cadastrar usuário:', res.message);
        // Exibir mensagem de erro
      }
    });
  }
  
  
}
