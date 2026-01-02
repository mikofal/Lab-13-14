import { Routes } from '@angular/router';
import { ListComponent } from './list/list';             
import { AddPersonComponent } from './add-person/add-person'; 
import { DetailsComponent } from './details/details';       

export const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },

    { path: 'list', component: ListComponent },
    { path: 'add-person', component: AddPersonComponent },
    { path: 'details/:id', component: DetailsComponent },

    { path: '**', redirectTo: '/list' } 
];