import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup<any>;
  message: any;
  error: any;
  productId!: string;

  constructor(private productService: ProductsService,
    private router: Router
  ) {
    
   }

  ngOnInit() {
    //Initialize the form
      this.productForm = new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        checked: new FormControl(false)
      });
    

    this.productId = this.router.routerState.snapshot.url.split('/').pop()!;
    
    this.productService.getProduct(this.productId).subscribe((product) => {
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

    this.productService.updateProduct(this.productForm.value, this.productId).subscribe({
      next: response => {
        this.error = "";
        this.message = "Product added successfully!";
      },
      error: error => {
        this.message = "";
        this.error = "An error occurred while adding the product!";
      }
    });
  }

}
