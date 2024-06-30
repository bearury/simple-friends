import {Routes} from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {AboutComponent} from "./components/pages/about/about.component";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {LayoutComponent} from "./components/common-ui/layout/layout.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {AuthComponent} from "./components/pages/auth/auth.component";
import {accessGuard} from "./guards/access.guard";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ],
    canActivate: [accessGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
