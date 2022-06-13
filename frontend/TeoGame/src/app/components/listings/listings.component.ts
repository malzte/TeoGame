import { Component, OnInit } from '@angular/core';
import { Ilisting } from 'src/app/interfaces/ilisting';
import { ListingService } from 'src/app/services/listing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit {

  listings!:Ilisting[];

  constructor(private listingService:ListingService, private userService:UserService) {

   }
  
   ngOnInit
  
  ionViewWillEnter(): void {
    let userData = this.userService.get_current_user();
    this.listingService.getUserListings(userData.user_id).subscribe((result) => {
      this.listings = result;
    });
  }

}
