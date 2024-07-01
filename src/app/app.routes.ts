import {Routes} from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {AboutComponent} from "./components/pages/about/about.component";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {LayoutComponent} from "./components/common-ui/layout/layout.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {AuthComponent} from "./components/pages/auth/auth.component";
import {accessGuard} from "./guards/access.guard";


export const enum RouterPath {
  Default = '',
  Profile = 'profile',
  About = 'about',
  Login = 'login',
  Signup = 'signup',
  Over = '**'
}

export const routes: Routes = [
  {
    path: RouterPath.Default,
    component: LayoutComponent,
    children: [
      {
        path: RouterPath.Default,
        component: HomeComponent
      },
      {
        path: RouterPath.Profile,
        component: ProfileComponent,
      }
    ],
    canActivate: [accessGuard]
  },
  {
    path: RouterPath.About,
    component: AboutComponent
  },
  {
    path: RouterPath.Login,
    component: AuthComponent
  },
  {
    path: RouterPath.Signup,
    component: AuthComponent
  },
  {
    path: RouterPath.Over,
    component: NotFoundComponent
  }
];
