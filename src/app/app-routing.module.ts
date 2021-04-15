import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';

const routes: Routes = [
  { path: 'Inicio', component: JuegoComponent },
  { path: '', redirectTo: '/Inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
