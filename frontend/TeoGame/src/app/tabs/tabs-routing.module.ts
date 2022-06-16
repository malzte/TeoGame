import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ListingsComponent} from '../components/listings/listings.component';
import { AuthguardService } from '../services/authguard.service';
import { SettingsComponent } from '../components/settings/settings.component';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../components/Home/tab1.module').then(m => m.Tab1PageModule)
      },
      {path: 'listings', component: ListingsComponent, canActivate: [AuthguardService]},
      {path: 'settings', component: SettingsComponent, canActivate: [AuthguardService]},
      //{path: 'tab3',canActivate: [AuthguardService], loadChildren: () => import('../MyProfile/tab3.module').then(m => m.Tab3PageModule)},
      {path: '',redirectTo: '/tabs/tab1',pathMatch: 'full'}
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
