import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductsService } from '../../services/products.service';
import { Observable, map } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Page } from '../../models/Page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  
  searchInput: FormControl<any> = new FormControl();
  currentPage: number = 1;
  size: number = 5;
  productsPage!: Page<Product>


  searchProducts() {
    this.products = this.productService.searchProduct(this.searchInput.value);
  }
  // IT Products
  products!: Observable<Product[]>;

  constructor(private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.productService.getProducts(this.currentPage, this.size).subscribe((productsPage) => {
      this.productsPage = productsPage;
    })
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      // Remove the product from the observable
      this.loadProducts()
    });
  }

  toggleCheck(product: Product) {
    this.productService.setProductChecked(product.id, !product.checked).subscribe(() => {
      product.checked = !product.checked;
    });
  }

  editProduct(productId: string) {
    this.router.navigate(['edit-product', productId]);
  }
  
  goToPage(page: number) {
    this.productService.getProducts(page, this.size).subscribe((productsPage) => {
      this.productsPage = productsPage;
      this.currentPage = page;
    })
  }
  nextPage() {
    this.productService.getProducts(this.productsPage.next, this.size).subscribe((productsPage) => {
      this.productsPage = productsPage;
      this.currentPage++;
    })
  }
  previousPage() {
    this.productService.getProducts(this.productsPage.prev, this.size).subscribe((productsPage) => {
      this.productsPage = productsPage;
      this.currentPage--;
    })
  }

}
