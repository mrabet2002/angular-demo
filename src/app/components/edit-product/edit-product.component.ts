import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  productForm!: FormGroup<any>;
  message: any;
  error: any;
  product!: Product;

  constructor(private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    //Initialize the form
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      checked: new FormControl(false)
    });

    let productId:string = this.router.routerState.snapshot.url.split('/').pop()!;
    this.productService.getProduct(productId).subscribe((product) => {
      this.product = product;
      this.productForm.setValue({
        name: product.name,
        price: product.price,
        checked: product.checked
      });
    })
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.message = "";
      this.error = "Please fill in all the required fields!";
      return;
    }

    this.productService.updateProduct(this.productForm.value, this.product.id).subscribe({
      next: response => {
        this.error = "";
        this.message = "Product added successfully!";
        this.productForm.reset();
      },
      error: error => {
        this.message = "";
        this.error = "An error occurred while adding the product!";
      }
    });
  }

}
