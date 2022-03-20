import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private usersService: UsersService) { }

  ngOnInit(): void {
    // if(!this.usersService.authActivate()){
    //     window.open("login", "_top");
    // }
    this.usersService.authActivate().then(resp => {
      if(!resp){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Token no valido, asegurese que la cuenta exista'
        })
        //window.open("login", "_top");
      }
    });
  }

}
