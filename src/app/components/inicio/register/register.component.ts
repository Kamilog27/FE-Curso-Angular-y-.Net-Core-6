import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  register: FormGroup = this.fb.group({
    NombreUsuario: ['', [Validators.required]],
    contraseña: ['', [Validators.required, Validators.minLength(4)]],
    repetirContraseña: ['', [Validators.required]]
  }, { validator: this.checkPassword });
  
  constructor(private fb: FormBuilder,private router:Router,private usuarioService:UsuarioService) {

  }
  registro() {
    this.usuarioService.saveUser(this.register.value).subscribe(data=>{
      Swal.fire({
        title: "Registrado",
        text: `${data.message}`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000
    
      });
      this.register.reset();
      this.router.navigate(['/inicio/login'])
    },error=>{
      Swal.fire({
        title: "Error!",
        text: `${error.error.message}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000
    
      });
      this.register.reset();
    })
  }
  checkPassword(group: FormGroup) {
    const password = group.controls['contraseña'].value;
    const rpassword = group.controls['repetirContraseña'].value;
    return password === rpassword ? null : { notSame: true };
  }
}
