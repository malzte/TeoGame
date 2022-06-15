import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/services/listing.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/Iuser';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit{
  registerForm;

  constructor(private listingService:ListingService, private service:UserService, private formBuilder: FormBuilder) {
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

  users!:IUser[];

  ngOnInit
  onFileChange(event:any) {  
    const file = event.target.files[0];
    this.registerForm.patchValue({
      image: file
    });    
}
  ionViewWillEnter(): void {
    let userData = this.service.get_current_user();
    this.listingService.getUserInfo(userData.user_id).subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
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
      alert('Register successful!');
    }, (err) => {
      alert('Register failed!');
      console.log(err);
    });
  }

}
