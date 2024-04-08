import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css'
})
export class NewProductsComponent {
  productForm!: FormGroup<any>;
  message: any;
  error: any;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    //Initialize the form
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      checked: new FormControl(false)
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.message = "";
      this.error = "Please fill in all the required fields!";
      return;
    }

    this.productService.addProduct(this.productForm.value).subscribe({
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
