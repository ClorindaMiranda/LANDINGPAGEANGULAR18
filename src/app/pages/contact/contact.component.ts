import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule , NgClass],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
    
  contactForm!: FormGroup;

  constructor( private formbuilder: FormBuilder){
    this.contactForm =this.formbuilder.group({
      email:['', [Validators.required, Validators.email]],
      message:['', [Validators.required, Validators.minLength(10)]]
    });
  }

enviar(event:Event) {
  event.preventDefault();           //prevenir que se reinicie la pagina
  console.log(this.contactForm.value);
}
ngOnInit(): void {
  
}
hasErrors( field :string , typeError : string ){
  return this.contactForm.get(field)?.hasError(typeError) && this.contactForm.get(field)?.touched;
}

}
