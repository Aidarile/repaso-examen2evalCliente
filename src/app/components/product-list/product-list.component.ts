
import { Component, inject } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Producto } from '../../interfaces/interface';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [FaIconComponent, NgbToast, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private readonly productService : ProductServiceService = inject(ProductServiceService);
  productList: Producto[] = [];
  toast = {
    body: '',
    color: 'bg-success'
  }
  toastShow: boolean = false;
  loading: boolean = false;

  constructor() {
    this.loadProducts();
  }

  protected loadProducts(){
    this.productService.getProducts().subscribe({
      next: value => {
        this.productList = value
      },
      error: err => this.showToast(err.message, 'bg-danger'),
      complete: () => {
        this.loading = true
        this.showToast('Products loaded Successfully!', 'bg-success')
      }
    })
  }

  private showToast(message: string, color: string){
    this.toast.body = message
    this.toast.color = color
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 1500)
  }

  protected readonly faCartShopping = faCartShopping;
  protected readonly faEdit = faEdit;
}