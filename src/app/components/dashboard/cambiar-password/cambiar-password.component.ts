import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  loading:Boolean=false;
  cambiarPassword: FormGroup = this.fb.group({
    passwordAnterior: ['', Validators.required],
    nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['']
  }, { validator: this.checkPassword });

  constructor(private fb: FormBuilder,private usuarioService:UsuarioService,
    private toastr:ToastrService,
    private router:Router) {

  }
  checkPassword(group: FormGroup) {
    const password = group.controls['nuevaPassword'].value;
    const rpassword = group.controls['confirmPassword'].value;
    return password === rpassword ? null : { notSame: true };
  }
  guardarPassword() {
    const changePassword:any={
      passwordAnterior:this.cambiarPassword.value.passwordAnterior,
      nuevaPassword:this.cambiarPassword.value.nuevaPassword,

    }
    this.loading=true;
    this.usuarioService.changePassword(changePassword).subscribe(data=>{
      this.toastr.info(data.message);
      this.router.navigateByUrl('/dashboard');
    },error=>{
      this.loading=false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message,'Error');
    })
  }
}
