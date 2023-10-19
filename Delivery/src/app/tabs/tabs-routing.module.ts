import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'e404',
        loadChildren: () => import('../e404/e404.module').then( m => m.E404PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  },
  {
    path: 'tab2',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  },
  {
    path: 'tab3',
    redirectTo: '/tabs/tab3',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    redirectTo: '/tabs/perfil',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/tabs/e404',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
