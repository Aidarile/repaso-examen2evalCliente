import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  imports: [FaIconComponent, NgbToast, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  private readonly productService: ProductServiceService = inject(ProductServiceService);

  private readonly fromBuilder: FormBuilder = inject(FormBuilder);

  @Input('id') id!: number;
  loading: boolean = false;

  public edit: boolean = false;

  formProduct: FormGroup = this.fromBuilder.group({
        id: [0, [Validators.required]],
        title: ['', [Validators.required]],
        price: [0, [Validators.required]],
        description: ['', [Validators.required]],
        category: ['', [Validators.required]],
        image: ['', [Validators.required]],
        rating: this.fromBuilder.group({
          rate: [0, [Validators.required]],
          count: [0, [Validators.required]]
        })
  })

  //GETTERS:

  get title(): any {
    return this.formProduct.get('title');
  }

  get price(): any {
    return this.formProduct.get('price');
  }

  get description(): any {
    return this.formProduct.get('description');
  }

  get category(): any {
    return this.formProduct.get('category');
  }

  get image(): any {
    return this.formProduct.get('image');
  }

  get rate(): any {
    return this.formProduct.get('rating.rate');
  }

  get count(): any {
    return this.formProduct.get('rating.count');
  }

  onSubmit() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
      return;
    }
    if (this.edit) {
      this.productService.updateProduct(this.formProduct.getRawValue()).subscribe(
        {
          next: value => {
            this.showToast(
              value.title + ' updated successfully!', 'bg-success', 1200
            )
          },
          error: err => {
            this.showToast(
              err.message,
              'bg-danger',
              2200
            )
          }
        }
      )
    } else {
      this.productService.addProduct(this.formProduct.getRawValue()).subscribe(
        {
          next: value => {
            this.showToast(
              value.title + ' added successfully!', 'bg-success', 1200
            )
          },
          error: err => {
            this.showToast(
              err.message,
              'bg-danger',
              2200
            )
          }
        }
      )
    }
  }

    toast = {
      body: '',
      color: 'bg-success'
    }
    toastShow: boolean = false;

  private showToast(message: string, color: string, duration: number){
    this.toast.body = message
    this.toast.color = color
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 1500)
  }

  ngOnInit(): void {
    if (this.id){
      this.edit = true;
      this.productService.getProduct(this.id).subscribe({
        next: value => {
          this.formProduct.setValue(value);
          this.showToast('Product loaded successfully', 'bg-success', 1200);
        },
        complete: () => {
          this.loading = true;
        },
        error: err => {
          this.showToast(err.message, 'bg-danger', 2200)
        }
      })
    } else {
      this.edit = false;
      this.formProduct.reset();
    }
  }

    protected readonly faCartShopping = faCartShopping;
    protected readonly faEdit = faEdit;
    protected readonly faTrashCan = faTrashCan;
}
