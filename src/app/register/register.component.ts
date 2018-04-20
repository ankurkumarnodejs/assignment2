import { Component,OnInit, ViewEncapsulation,  NgModule} from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any;


@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent  implements OnInit{
  credentials: TokenPayload = {
    email: '',
    username: '',
    name: '',
    contactnumber: '',
    password: ''
  };
  loginForm: FormGroup;


  constructor(private auth: AuthenticationService, private router: Router, public lf: FormBuilder) {
    $(document).ready(()=> {});
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/welcome');
    }
    this.validate();
  }
  ngOnInit(){
    this.loginForm = this.lf.group({
            email:  ['',Validators.required],
            username:  ['',Validators.required],
            name:  ['',Validators.required],
            contactnumber:  ['',Validators.required],
            password:  ['',Validators.required],
            validated: ['',Validators.required]
        });
  }

  register() {
    this.credentials = this.loginForm.value;
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/welcome');
    }, (err) => {
    });
  }

  validate(){
    $(".errcontactname").html("");
    $(".errusername").html("");
    $(".erremail").html("");
  }

  checkAlready(event){
    var obj:any = {};
    var name = event.target.name;
    obj[name] = event.target.value;
    if(obj[name].length > 0){
    this.auth.checkAlready(obj).subscribe((data) => {
    this.validate();
    if(data.error){
    this.loginForm.controls["validated"].setValue('');  
    var p = "<p class='alert alert-danger'>" +data.message+ "</p>";
    $('.err'+name).html("");
    $('.err'+name).html(p);
    }else{
    this.loginForm.controls["validated"].setValue(true);  
    var a = "<p class='alert alert-success'>" +data.message+ "</p>";
    $('.err'+name).html("");  
    $('.err'+name).html(a);  
    }
    }, (err) => {
      console.error(err);
      this.loginForm.controls["validated"].setValue('');
    });
    }else{
    $('.err'+name).html("");
    this.loginForm.controls["validated"].setValue(''); 
  }
  }
}
