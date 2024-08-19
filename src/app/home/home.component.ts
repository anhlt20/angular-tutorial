import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../type';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = []
  totalRecords: number = 0
  rows: number = 12;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  selectedProduct: Product = {
    name: '',
    image: '',
    price: 0,
    rating: 0
  }

  constructor(
    private productService: ProductsService
  ) { }

  toggleDeletePopup(product: Product) {
    if(!product.id){
      return
    }
    this.deleteProduct(product.id)
  }

  toggleEditPopup(product: Product){
    this.selectedProduct = product
    this.displayEditPopup = true

  }

  toggleAddPopup(){
    this.selectedProduct = {
      name: '',
      image: '',
      price: 0,
      rating: 0
    }
    this.displayAddPopup = true
  }

  onConfirmEdit(product: Product){
    if(!this.selectedProduct.id){
      return
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = true;
  }

  onConfirmAdd(product: Product){
    this.addProduct(product);
    this.displayAddPopup = true;
  }

  onProductOutPut(product: Product) {
    console.log(product)
  }

  onPageChange(event: any) {
    this.fetchProduct(event.page, event.rows)
  }

  resetPaginator(page: number){
    this.paginator?.changePage(page)
  }

  fetchProduct(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe(
        {
          next: (response: Products) => {
            this.products = response.items
            this.totalRecords = response.total
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
  }

  addProduct(product: Product) {
    this.productService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe(
        {
          next: (response) => {
            this.fetchProduct(0, this.rows)
            this.resetPaginator(0)
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
  }

  editProduct(product: Product, productId: number) {
    this.productService
      .updateProduct(`http://localhost:3000/clothes/${productId}`, product)
      .subscribe(
        {
          next: (response) => {
            this.fetchProduct(0, this.rows)
            this.resetPaginator(0)
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
  }

  deleteProduct(productId: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${productId}`)
      .subscribe(
        {
          next: (response) => {
            this.fetchProduct(0, this.rows)
            this.resetPaginator(0)
          },
          error: (error) => {
            console.log(error)
          }
        }
      )
  }

  ngOnInit() {
    this.fetchProduct(0, this.rows)
  }



}
