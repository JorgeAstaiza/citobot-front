import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  public formulario!: FormGroup;
  constructor( public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.formulario = this.fb.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      passwordRepeat: [null, Validators.required]

    })
  }

  public registrarUsuario() {
    console.log(this.formulario.value);
    
    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('password')?.value;
    const passwordRepeat = this.formulario.get('passwordRepeat')?.value;

    if (this.formulario.valid) {
      if (password === passwordRepeat) {
        this.authService.SignUp(email, password).then((result:any) => {
          console.log(result);
          if (result.user.uid) {
            console.log('mostrar mensaje de exito');
            
          }
          
        });  
      } else {
        console.log('mostrar mensaje constraseñas diferentes');
        
      }
    }
    
  }


}
