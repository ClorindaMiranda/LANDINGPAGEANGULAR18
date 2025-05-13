import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { debounceTime, map, Observable ,of, startWith} from 'rxjs';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import  {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productList: IProduct[] = [];
  allProducts: IProduct[] = [];
  private  _apiservice = inject(ApiService);
  private _router= inject (Router)   //para que navegue en el detalle del boton

  
  filterProducts: Observable<IProduct[]> = of([]);
  productCtrl = new FormControl<IProduct | null>(null);

  ngOnInit(): void {
    this._apiservice.getProducts().subscribe((data: IProduct[]) => {
      console.log(data);
      this.productList = data;
      this.allProducts=data;
      this.filterProducts = this.productCtrl.valueChanges.pipe(
        startWith(''),
        debounceTime(500),          //espera de milisegundos
        map(value => this._filter(typeof value === 'string' ? value : '')),
      );
    }
  );
  }
  navigate(id: number): void {
    this._router.navigate(['products',id]) ;       //redirecciona al boton del producto
    //console.log(id)
    }

//filter products
    private _filter(value: string): IProduct[] {
      const filterValue = value.toLocaleLowerCase();
      return this.allProducts.filter(product => 
        product.productDescription.toLocaleLowerCase().indexOf(filterValue) === 0
      );
    }

    displayFn(product: IProduct): string {
  return product && product.productDescription ? product.productDescription : '';
}

onEnter(event: KeyboardEvent | any): void {
  event.preventDefault();

  const value: string | null = typeof this.productCtrl.value === 'string' ? this.productCtrl.value : null;

  if (value && typeof value === 'string' ) {
    const matches = this._filter(value);

    if (matches.length === 1) {
      this.onProductSelected(matches[0]);
    } else if (matches.length > 1) {
      this.onProductSelected(matches[0]);
    } else {
      console.log('No se encontraron coincidencias');
    }
  } else {
    console.log('El valor ingresado no es válido');
  }
}

onProductSelected(selected: IProduct): void {           //llena la tabla al seleccionar producto
  if (selected && !this.productList.find(p => p.productId === selected.productId)) {
    this.productList.push(selected);
  }
  this.productCtrl.setValue(null); // limpiar input
}

  onOptionSelected(selectedProduct: IProduct): void {
    this.productCtrl.setValue(selectedProduct);
    this.navigate(selectedProduct.productId);
  }


}
