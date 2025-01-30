import { Component, inject, OnInit ,Pipe} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  
  loading: boolean =true
  public  product?: IProduct;

  private _route = inject(ActivatedRoute);
  private _apiservice= inject(ApiService)

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._apiservice.getProduct(params['id']).subscribe((data: IProduct) => {
        this.product=data;
        //console.log(data)
        this.loading= false;
      });
    }
  );
  }
}


