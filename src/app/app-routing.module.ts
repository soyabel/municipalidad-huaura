import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// dominio.com/
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'servicios',
    loadChildren: () => import('./muni/muni.module').then( m => m.MuniModule ),
  },

  {
    path: '**',
    redirectTo: 'servicios',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
