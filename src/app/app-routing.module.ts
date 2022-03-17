import { AuthGuardService } from './services/guard/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: 'chat', loadChildren: () => import('./pages/chat/chat/chat.module').then(m => m.ChatModule), canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
