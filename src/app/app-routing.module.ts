import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { NewProductsComponent } from './components/new-products/new-products.component';
import { HomeComponent } from './components/home/home.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'new-products', component: NewProductsComponent },
  { path: '', component: HomeComponent },
  { path: 'edit-product/:id', component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
