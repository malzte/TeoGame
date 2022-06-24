import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;

  constructor(private service:UserService, private formBuilder: FormBuilder, private alertController:AlertController) {
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
      password: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onFileChange(event:any) {  
    const file = event.target.files[0];
    this.registerForm.patchValue({
      image: file
    });    
}

async presentAlert(msg) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}

  register(){
    let formData = this.registerForm.value;
    let f = new FormData();

    //Transfer of all formgroup data into the FormData object;
    for(let k in formData)
    {
      f.append(k, formData[k]);
    }
    this.service.register(f).subscribe((result) => {
      this.presentAlert('Register successful!');
    }, (err) => {
      this.presentAlert('Register failed!');
      console.log(err);
    });
  }

}