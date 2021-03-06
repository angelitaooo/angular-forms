import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: "stock-products",
  styleUrls: ["stock-products.component.scss"],
  template: `
        <div class="stock-products" [formGroup]="parent">
            <div formArrayName="stock">
                <div *ngFor="let item of stocks; let i = index;"> 
                    <div class="stock-product__content" [formGroupName]="i">
                        <div class="stock-product__name">
                            {{item.value.product_id}}
                        </div>
                        <input 
                            type="number"
                            step="10"
                            min="10"
                            max="1000"
                            formControlName="quantity">
                        <button type="button" (click)="onRemove(item, index)">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class StockProductsComponent {
  @Input() parent: FormGroup;
  @Output() removed = new EventEmitter<any>();

  get stocks() {
      return (this.parent.get('stock') as FormArray).controls;
  }

  onRemove(group, index) {
      this.removed.emit({group, index});
  }
}