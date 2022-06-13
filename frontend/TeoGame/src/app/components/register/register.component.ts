import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;

  constructor(private service:UserService, private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      street_address: ['', [Validators.required]],
      postalcode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      interests: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  register(){
    let formData = this.registerForm.value;
    this.service.register(formData).subscribe((result) => {
      alert('Register successful!');
    }, (err) => {
      alert('Register failed!');
      console.log(err);
    });
  }

}