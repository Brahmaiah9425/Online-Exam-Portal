import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UserTestResultsComponent } from './modules/user/components/user-test-results/user-test-results.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about-us', component: AboutusComponent },
    { path: 'contact-us', component: ContactusComponent },
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    {path: 'user/view-test-results', component: UserTestResultsComponent },
    { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) }, 
    { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) }
];
