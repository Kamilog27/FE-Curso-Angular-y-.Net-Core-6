import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading=false;

  login:FormGroup=this.fb.group({
    NombreUsuario:['',[Validators.required]],
    contraseña:['',[Validators.required]]
  });
  constructor(private fb:FormBuilder,
    private toastr: ToastrService,
    private router:Router,
    private loginService:LoginService){

  }

  logeo(){
    // console.log(this.login.value);
    const usuario:Usuario={
      NombreUsuario:this.login.value.NombreUsuario,
      contraseña:this.login.value.contraseña
    }
    this.loading=true;
    this.loginService.login(this.login.value).subscribe(data=>{
    //  const nombre=this.loginService.getTokenDecoded(); 
      Swal.fire({
        title: "Ingreso Exitoso",
        text: `Bienvenido ${data.usuario}`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000
    
      });
      this.login.reset();
      this.loading=false;
      this.loginService.setLocalStorage(data.token);
      this.router.navigate(['/dashboard'])
    },error=>{
      this.loading=false;
      this.toastr.error(error.error.message,'Error');
      this.login.reset();
      this.router.navigate(['/inicio/login'])
    })
    // setTimeout(()=>{
    //   if(usuario.NombreUsuario==='jgarcia'&&usuario.contraseña==='admin123'){
    //     this.login.reset();
    //     this.router.navigate(['/dashboard']);
    //   }else{
    //     this.toastr.error('Usuario o contraseña incorrecto','Error');
    //     this.login.reset();
    //   }
    //   console.log(usuario);
    //   this.loading=false;
    // },3000)
  }
}
