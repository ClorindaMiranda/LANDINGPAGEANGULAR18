import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//Angular Material
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ,
           NgClass,
           MatSnackBarModule,
           MatProgressSpinnerModule,
          ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
    
  contactForm!: FormGroup;
  loading: boolean = false;

  constructor( private formbuilder: FormBuilder,  private _snackBar:MatSnackBar){
    this.contactForm =this.formbuilder.group({
      email:['', [Validators.required, Validators.email]],
      message:['', [Validators.required, Validators.minLength(10)]]
    });
  }

enviar(event:Event) {
  event.preventDefault();           //prevenir que se reinicie la pagina
 
  const email = this.contactForm.get('email')?.value;
  const message = this.contactForm.get('message')?.value;
  // console.log(this.contactForm.value);
  if(email == 'cmiranda160709@' && message == 'hola soy clorinda'){   //redirecciona al dashboard
    this.fakeLoading();           //simula un tiempo de carga

  }else{
    //mostramos un mensaje de error
    this.openSnackBar();
    this.contactForm.reset(); //limpiar el formulario
  }

  this.contactForm.reset(); //limpiar el formulario
}

openSnackBar(){                   //Error al enviar el mensaje
  this._snackBar.open('Mensaje enviado correctamente', 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
}

fakeLoading(){
  this.loading =true;  //simula un tiempo de carga
  setTimeout(() => {
    this.loading =false; //despues de 1.5 segundos se oculta el spinner
  }, 1500); //1.5 segundos
}
ngOnInit(): void {
  
}
hasErrors( field :string , typeError : string ){
  return this.contactForm.get(field)?.hasError(typeError) && this.contactForm.get(field)?.touched;
}

}
