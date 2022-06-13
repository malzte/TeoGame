import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(public alertController: AlertController, private service:UserService, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
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

  login(){
    let formData = this.loginForm.value;
    this.service.login(formData).subscribe((result) => {
      localStorage.setItem('currentUser', JSON.stringify(result)); //Storing the data of the currently logged in user on the browser
      this.presentAlert('Login successful!');
    }, (err) => {
      this.presentAlert('Incorrect email and/or password');
      console.log(err);
    });
  }

}
