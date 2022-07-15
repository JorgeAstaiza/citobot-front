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
  public usuarioRegistrado = false;
  public passwordMistake = false;
  public formInvalid = false;
  private regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  private regexSoloNumeros = /^[0-9,$]*/;
  constructor( 
    public authService: AuthService, 
    private fb: FormBuilder,
   ) { }

  ngOnInit() {
    this.crearForm();
  }

  private crearForm() {
    this.formulario = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(5)]],
      id: [null, [Validators.required, Validators.pattern(this.regexSoloNumeros)]],
      role: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.regexEmail)]],
      password: [null, Validators.required],
      passwordRepeat: [null, Validators.required]

    })
  }

  public registrarUsuario() {
    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('password')?.value;
    const passwordRepeat = this.formulario.get('passwordRepeat')?.value;
    console.log(this.formulario.value);

    if (this.formulario.valid) {
      if (password === passwordRepeat) {
        this.authService.SignUp(email, password).then((result:any) => {
          console.log(result);
          if (result.user.uid) {
            this.usuarioRegistrado = true;
            this.saveUserBD();
            setTimeout(() => {
              this.usuarioRegistrado = false;
            }, 3000);
          }
          
        });  
      } else {
        console.log('mostrar mensaje constraseñas diferentes');
        this.passwordMistake = true;
        setTimeout(() => {
          this.passwordMistake = false;
        }, 3000);
      }
    } else{
      this.formInvalid = true;
      setTimeout(() => {
        this.formInvalid = false;  
      }, 3000);
    }

    
  }

  private saveUserBD() {
    console.log(this.formulario.value);
    
    // this.sigupService.registerUser(this.formulario.value).subscribe((res) => {
    //   console.log(res);
      
    // })
  }


}
