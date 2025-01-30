import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productList: IProduct[] = []
  private  _apiservice = inject(ApiService);
  private _router= inject (Router)   //para que navegue en el detalle del boton

  ngOnInit(): void {
    this._apiservice.getProducts().subscribe((data: IProduct[]) => {
      console.log(data);
      this.productList = data;
    }
  );
  }
  navigate(id: number): void {
    this._router.navigate(['/products',id]) ;       //redirecciona al boton del producto
    //console.log(id)
    }
}
