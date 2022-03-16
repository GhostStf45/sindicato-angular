import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersModel } from '../../models/users.model';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UsersModel;

  constructor(private usersService: UsersService) {
    this.user = new UsersModel();

  }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    // REGISTRO FIREBASE AUTHENTICATION
    this.user.returnSecureToken = true;

    this.usersService.registerAuth (this.user)
        .subscribe( resp => {
          if(resp['email'] == this.user.email){

            this.user.displayName = `${this.user.nombres} ${this.user.apellidos}`;

            this.user.idToken = resp['idToken'];
            this.user.needConfirm = false;

            this.usersService.registerDatabase(this.user)
                .subscribe( resp => {
                  console.log('resp', resp);
                });
          }
    });

    //console.log('this.user', this.user);

    //console.log("f", f);
    //this.usersService.registerAuth(this.user)
  }

}
