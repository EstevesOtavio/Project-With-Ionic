import { Injectable } from '@angular/core';
import { dadosUser } from '../models/dadosUser';
import { dadosForm } from '../models/dadosForm';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  api_url: string =
    'http://localhost/pages/project_disp_mov/projeto-16-09/api.php';
  produtos: dadosForm[] = [];

  constructor() {}

  public realizarLogin(usuario: any) {
    const body = {
      action: 'login',
      usuario: usuario,
    };
    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  public cadastrarUsuario(novoUsuario: any) {
    const body = {
      action: 'cadastrarUsuario',
      usuario: novoUsuario,
    };
    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  public listarTodosProdutos(id_user: number) {
    const body = {
      action: 'listarProdutos',
      id_user: id_user,
    };
    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          // Separar os produtos em dois vetores
          console.log(data);
          this.produtos = data.result;
          const produtosAdquiridos = data.result.filter(
            (produto: any) => produto.adquirido === 1
          );
          const produtosNaoAdquiridos = data.result.filter(
            (produto: any) => produto.adquirido === 0
          );

          return {
            adquiridos: produtosAdquiridos,
            naoAdquiridos: produtosNaoAdquiridos,
          };
        } else {
          throw new Error(data.message);
        }
      });
  }

  public inserirProduto(novoProduto: any) {
    const body = {
      action: 'inserirProduto',
      produto: novoProduto,
    };
    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));

    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  public retornarProduto(produtoId: number, status: number) {
    console.log(status)
    console.log(this.produtos);
    for (const produto of this.produtos) {
        console.log(produto)
        if(produto.id == produtoId && produto.adquirido == status) {
        return produto;
      }
    }
    console.log('Produto não encontrado')
    return this.produtos[0];
  }

  public editarProduto(produtoEditado: any) {
    const body = {
      'action': 'editarProduto',
      'produto': produtoEditado
    }
    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));
  
    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data;
    });
  }

  public excluirProduto(param_produto : any) {
    const body = {
      'action': 'excluirProduto',
      'produto': param_produto
    };
    
    let bodyFd = new FormData();
    bodyFd.append('data', JSON.stringify(body));
  
    return fetch(this.api_url, {
      method: 'POST',
      body: bodyFd
    })
    .then(response => response.json())
    .then(data => {
      return data;
    });
  } 
}
