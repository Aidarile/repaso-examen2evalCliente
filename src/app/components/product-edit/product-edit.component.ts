
import { ProductServiceService } from './../../services/product-service.service';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../interfaces/interface';
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
@Component({
  selector: 'app-product-edit',
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  @Input("id") id!: number;

  private readonly productService: ProductServiceService = inject(ProductServiceService);

  producto!: Producto;

  protected readonly faTrashCan = faTrashCan;
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  formProducto: FormGroup = this.formBuilder.group({
    _id: [0],
    title: [''],
    price: [0],
    description: [''],
    category: [''],
    image: [''],
    rating: this.formBuilder.group({
      rate: [0],
      count: [0]
    })
  })

   /* GETTERS */
   editar: boolean = false;
   public loading: boolean = true;

   get title(): any {
    return this.formProducto.get('title');
   }

   get price(): any {
    return this.formProducto.get('price');
   }

   get description(): any {
    return this.formProducto.get('description');
   }

   get category(): any {
    return this.formProducto.get('category');
   }
   get image(): any {
    return this.formProducto.get('image');
   }
   get rating(): any {
    return this.formProducto.get('rating');
   }

   ngOnInit(): void {
    if (this.id) {
      this.loadProduct();
      this.editar = true;
      this.loading = false;
    } else {
      this.formProducto.reset();
      this.editar = false;
      this.loading = false;
    }
   }

   onSubmit() {
    if (this.editar) {
      this.productService.updateProduct(this.formProducto.getRawValue()).subscribe({
        next: value => {
          console.log('Updated!');
        },
        error: err => {
          console.error(err);
        }
      });
    } else {
      this.productService.addProduct(this.formProducto.getRawValue()).subscribe({
        next: value => {
          console.log('Created!');
        },
        error: err => {
          console.error(err);
        }
      });
    }
   }

   protected loadProduct() {
    this.productService.getProduct(this.id).subscribe({
      next: value => {
        this.formProducto.setValue(value);
      },
      complete: () => {
        console.log('Producto cargado!');
      },
      error: err => {
        console.error(err);
      }
    })
   }
}
