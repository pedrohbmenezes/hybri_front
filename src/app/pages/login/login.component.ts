import Swal  from 'sweetalert2';
import { TokenService } from './../../services/token/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export type returnlogin = {
  access_token:string
}

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  sign = new FormGroup({
    username: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })

  login = new FormGroup({
    username: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })
    response:any
  constructor(private authService: AuthService, private tokenService: TokenService, private router:Router) { }
  
  onSubmit() {
    this.authService.login(this.login.value.username, this.login.value.password).subscribe((res: returnlogin) => {
      this.tokenService.saveToken(res.access_token)
      this.tokenService.saveUser(this.login.value.username)
      this.router.navigateByUrl('/chat')
    })
  }
  onSubmit_sign() {
    this.authService.sign(this.login.value.username, this.login.value.password).subscribe((res: returnlogin) => {
      const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast:any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: "Cadastrado"
    })
      this.login.value.username = ""
      this.login.value.password =""
      
    })
  }
  ngOnInit(): void {
   
  }

}
