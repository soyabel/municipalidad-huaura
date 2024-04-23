import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 //import { AuthGuard } from './auth/guards/auth.guard';


// dominio.com/
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    // canActivate:[AuthGuard]
  },
  {
    path: 'servicios',
    loadChildren: () => import('./muni/muni.module').then( m => m.MuniModule ),
  },
  // {
  //   path: 'auth/login/:id', // <-- Configuración para aceptar parámetros en /auth/login
  //   loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  // },
  // {
  //   path: '404',
  //   component: Error404PageComponent,
  // },
  {
    path: '**',
    redirectTo: 'servicios',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: '404',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
