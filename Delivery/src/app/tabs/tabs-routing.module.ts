import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'retiro',
        loadChildren: () => import('../retiro/retiro.module').then( m => m.RetiroPageModule)
      },
      {
        path: 'detalles-pedido/:id',
        loadChildren: () => import('../retiro/detalles-pedido/detalles-pedido.module').then( m => m.DetallesPedidoPageModule)
      },
      {
        path: 'entrega',
        loadChildren: () => import('../entrega/entrega.module').then( m => m.EntregaPageModule)
      },
      {
        path: 'detalle-entrega/:id',
        loadChildren: () => import('../entrega/detalle-entrega/detalle-entrega.module').then( m => m.DetalleEntregaPageModule)
      },
      {
        path: 'confirmacion-entrega/:id',
        loadChildren: () => import('../entrega/confirmacion-entrega/confirmacion-entrega.module').then( m => m.ConfirmacionEntregaPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
