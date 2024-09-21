import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'listar-dados',
    loadChildren: () =>
      import('./listar-dados/listar-dados.module').then(
        (m) => m.ListarDadosPageModule
      ),
  },
  {
    path: 'listar-dados/:id_user',
    loadChildren: () =>
      import('./listar-dados/listar-dados.module').then(
        (m) => m.ListarDadosPageModule
      ),
  },
  {
    path: 'formulario',
    loadChildren: () =>
      import('./formulario/formulario.module').then(
        (m) => m.FormularioPageModule
      ),
  },
  {
    path: 'formulario/:id_user/:status',
    loadChildren: () =>
      import('./formulario/formulario.module').then(
        (m) => m.FormularioPageModule
      ),
  },
  {
    path: 'editar-produto',
    loadChildren: () => import('./editar-produto/editar-produto.module').then( m => m.EditarProdutoPageModule)
  },
  {
    path: 'editar-produto/:id_produto/:status',
    loadChildren: () => import('./editar-produto/editar-produto.module').then( m => m.EditarProdutoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
