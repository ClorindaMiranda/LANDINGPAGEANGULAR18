import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {map, startWith,debounceTime} from 'rxjs/operators';
import { IProduct } from './models/product.model';
import { ApiService } from './services/api.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  
  menuOption: string = ''
  title = 'angular-frontend';

  onOption(menuOption: string){
    this.menuOption= menuOption;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
