import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BetsComponent} from './bets/bets.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/bets', pathMatch: 'full'},
  {path: 'bets', component: BetsComponent},
  {path: 'login', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
