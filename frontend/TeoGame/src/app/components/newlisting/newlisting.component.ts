import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-newlisting',
  templateUrl: './newlisting.component.html',
  styleUrls: ['./newlisting.component.scss']
})
export class NewlistingComponent implements OnInit {

  newListing;

  constructor(private formBuilder: FormBuilder,private userService:UserService, private alertController:AlertController) {
    this.newListing = formBuilder.group({
      user_id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      type: ['', [Validators.required]], 
      description: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      game_id: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
  }

  onFileChange(event:any) {  
    const file = event.target.files[0];
    this.newListing.patchValue({
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

  newlisting(){
    let userData = this.userService.get_current_user();
    let formData = this.newListing.value;
    formData.user_id = userData.user_id;
    let f = new FormData();

    //Transfer of all formgroup data into the FormData object;
    for(let k in formData)
    {
      f.append(k, formData[k]);
    }

    this.userService.newlisting(f).subscribe((result) => {
      this.presentAlert('Listing has been posted!');
    }, (err) => {
      this.presentAlert('Listing failed to post');
      console.log(err);
    });
  }
}