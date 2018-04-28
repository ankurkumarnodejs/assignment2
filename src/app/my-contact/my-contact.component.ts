import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-contact',
  templateUrl: './my-contact.component.html',
  styleUrls: ['./my-contact.component.css']
})
export class MyContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@Component({
  selector: 'app-my-contact-list',
  templateUrl: './my-contact-list.component.html',
  styleUrls: ['./my-contact.component.css']
})
export class MyContactListComponent implements OnInit {

  constructor(){ }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-my-contact-add',
  templateUrl: './my-contact-add.component.html',
  styleUrls: ['./my-contact.component.css']
})
export class MyContactAddComponent implements OnInit {
  invoiceForm: FormGroup;
  details: UserDetails;

  constructor(private _fb: FormBuilder,private auth: AuthenticationService, private router: Router,) { }

  ngOnInit() {

  	 this.invoiceForm = this._fb.group({
     itemRows: this._fb.array([this.initItemRows()]) // here
     });

     this.userDetail();

  }
  
  userDetail(){
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  initItemRows() {
    return this._fb.group({
        // list all your form controls here, which belongs to your form array
       
        name: ['', Validators.required],
        contactnumber: ['', Validators.required],
        email: ['', Validators.required],
        profileurl: ['', Validators.required],
        contacttype: ['', Validators.required]
    });
}

  addNewRow() {
    // control refers to your formarray
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    // add new formgroup
    control.push(this.initItemRows());
}

deleteRow(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    // remove the chosen row
    control.removeAt(index);
}

saveContact(){
	console.log(this.invoiceForm.controls['itemRows'].value);
  console.log("dsdssd", this.details);
  var carr = this.invoiceForm.controls['itemRows'].value.map((item) => {return item["userId"] = this.details._id});
  
  var dataarray:any = {"contacts" : carr} 
  this.auth.addContact(dataarray).subscribe((data) =>{
   console.log("data", data); 
   
  });
}
}


@Component({
  selector: 'app-my-contact-edit',
  templateUrl: './my-contact-edit.component.html',
  styleUrls: ['./my-contact.component.css']
})
export class MyContactEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
