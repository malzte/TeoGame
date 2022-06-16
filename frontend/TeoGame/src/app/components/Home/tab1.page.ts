import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ListingService } from 'src/app/services/listing.service';
import { UserService } from 'src/app/services/user.service';
import { Ilisting } from 'src/app/interfaces/ilisting';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
    filterTerm:string; 
    isLoggedIn:boolean = false; 
    title = 'frontend';
    listings!:Ilisting[];
    ngOnInit(): void {
      
    }

    public constructor(private alertController:AlertController, private router:Router,private listingService:ListingService, private userService:UserService){  }

    ionViewWillEnter(): void {
      this.listingService.getAllListings().subscribe((result) => {
        this.listings = result;
      });
    }

    ionViewWillLeave(): void {
      if (this.userService.isAuthenticated()) {
        this.isLoggedIn = true;
      }
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

    logout(){
      localStorage.removeItem("currentUser");
      this.presentAlert("User logged out!");
      this.router.navigate(['login']);
    }

}
     