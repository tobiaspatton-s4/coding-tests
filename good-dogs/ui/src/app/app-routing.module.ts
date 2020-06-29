import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DogsComponent } from './dogs/dogs.component';


const routes: Routes = [
  { path: 'dogs', component: DogsComponent, pathMatch: 'full' },
  { path: 'dogs/:breed', component: DogsComponent },
  { path: '', redirectTo: '/dogs', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
