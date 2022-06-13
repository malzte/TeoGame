import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/services/listing.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/Iuser';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit{

  users!:IUser[];
  constructor(private listingService:ListingService, private userService:UserService) {

  }
  ngOnInit

  ionViewWillEnter(): void {
    let userData = this.userService.get_current_user();
    this.listingService.getUserInfo(userData.user_id).subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
  }
}
