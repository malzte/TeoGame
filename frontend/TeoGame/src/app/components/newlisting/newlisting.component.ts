import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-newlisting',
  templateUrl: './newlisting.component.html',
  styleUrls: ['./newlisting.component.scss']
})
export class NewlistingComponent implements OnInit {

  newListing;

  constructor(private formBuilder: FormBuilder,private userService:UserService) {
    this.newListing = formBuilder.group({
      user_id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      type: ['', [Validators.required]], 
      description: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      game_id: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
  }

  newlisting(){
    let userData = this.userService.get_current_user();
    let formData = this.newListing.value;
    formData.user_id = userData.user_id;
    this.userService.newlisting(formData).subscribe((result) => {
      alert('Listing has been posted!');
    }, (err) => {
      alert('Listing failed to post');
      console.log(err);
    });
  }

}