import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListingsComponent } from './components/listings/listings.component';
import { AuthguardService } from './services/authguard.service';
import { NewlistingComponent } from './components/newlisting/newlisting.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'listings', component: ListingsComponent, canActivate: [AuthguardService]},
  {path: 'newlisting', component: NewlistingComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'myprofile', component: MyprofileComponent}

  // {
  //   path: 'login',
  //   loadChildren: () => import('./components/login/login.component').then( m => m.LoginComponent)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
