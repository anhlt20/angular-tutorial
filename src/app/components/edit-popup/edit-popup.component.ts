import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../type';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, this.specialCharactorValidator()]],
      price: [0],
      image: ['', [Validators.required]],
      rating: [0]
    })
  }

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    price: 0,
    image: '',
    rating: 0
  }

  @Output() confirm = new EventEmitter<Product>();

  ngOnChanges() {
    this.productForm.patchValue(this.product)
  }

  onConfirm() {
    this.confirm.emit(this.productForm.value)
    this.changeDisplay(false)
  }

  onCancel() {
    this.changeDisplay(false)
  }

  changeDisplay(display: boolean) {
    this.display = display;
    this.displayChange.emit(this.display)
  }

  specialCharactorValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharactor = /[!@]+/.test(
        control.value
      );

      return hasSpecialCharactor ? { hasSpecialCharactor: true } : null;
    }
  }
}
