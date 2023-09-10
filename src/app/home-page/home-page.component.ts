
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserInfo, Order } from '../types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  user: UserInfo | null = null;

 
  

  foodToggle = true;
  drinkToggle = true;
  glampingImageUrl = 'https://i.imgur.com/0e3TNvV.jpg';
  cardsImageUrl = 'https://i.imgur.com/bn2NcWH.jpg';
  groups: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  options: number[] = Array.from({length: 30}, (_, i) => i + 1); // creates an array [1, 2, ..., 30]

  groupsCamping: string[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  optionsCamping: number[] = Array.from({length: 6}, (_, i) => i + 2); // creates an array [2, 3, ..., 7]

  public showGlampingSection: boolean = false;
  public showCampingSection: boolean = false;
  public showMenu: boolean = false;
  public showNotification: boolean = true;
  public showMainImage: boolean = true;
  public settingsMenu: boolean = false;

  @ViewChild('menuDiv') menu!: ElementRef;
  @ViewChild('menu') menuElement!: ElementRef;

  showSettingsMenu() {
    // Your logic here
    this.settingsMenu = !this.settingsMenu;
  }

  hideSettingsMenu() {
    this.settingsMenu = false;
  }
  

  showGlamping() {
    this.showGlampingSection = true;    
    
    this.showNotification = false;
    this.showMainImage = false;
    window.scrollTo(0, 0);
  }

  showCamping() {
    this.showCampingSection = true;
    
    this.showNotification = false;
    this.showMainImage = false;
    window.scrollTo(0, 0);
  }

  goBack() {
    this.showGlampingSection = false;
    this.showCampingSection = false;
    
    this.showNotification = true;
    this.showMainImage = true;
    window.scrollTo(0, 0);

  }

  
  selectAddress() {
    this.showGlampingSection = false;
    this.showCampingSection = false;
    this.showMenu = true;    

    this.showNotification = true;
    this.showMainImage = true;
    
    setTimeout(() => {
      this.menuElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);

  }

  items = [
    
    {
      name: 'Mexican Burrito',
      type: 'food',
      price: 21,
      imgUrl: 'https://i.imgur.com/SQMJMo0.jpg',
    },
    {
      name: 'Flame Grilled Pizza',
      type: 'food',
      price: 21,
      imgUrl: 'https://i.imgur.com/y1qSwBo.jpg',
    },
    {
      name: 'Cheeseburger & Chips',
      type: 'food',
      price: 19,
      imgUrl: 'https://i.imgur.com/G0uWy7l.jpg',
    },
    
    {
      name: 'Halloumi & Fies',
      type: 'food',
      price: 19,
      imgUrl: 'https://i.imgur.com/aF74nmM.jpg',
    },
    
    {
      name: 'Mac & Cheese',
      type: 'food',
      price: 20,
      imgUrl: 'https://i.imgur.com/zF2d2B3.jpg',
    },
    {
      name: 'Cafe Latte',
      type: 'drink',
      price: 8,
      imgUrl: 'https://i.imgur.com/80Ynlvv.jpg',
    },
    {
      name: 'Flat White',
      type: 'drink',
      price: 8,
      imgUrl: 'https://i.imgur.com/80Ynlvv.jpg',
    },
    {
      name: 'Cup of Tea',
      type: 'drink',
      price: 8,
      imgUrl: 'https://i.imgur.com/80Ynlvv.jpg',
    },
    
    {
      name: 'Hot Chocolate',
      type: 'drink',
      price: 8,
      imgUrl: 'https://i.imgur.com/DBkX0XL.jpg',
    },
    // add more items here
  ];

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(firebaseUser => {
      if(firebaseUser){
      this.user = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        lastSignInTime: firebaseUser.metadata.lastSignInTime || '',
        fullName: '',
        bio: '',
      }
      this.http.get<{fullName: string, bio: string}>(`/api/users/${firebaseUser.uid}`)
      .subscribe(userInfo => {
        this.user!.fullName = userInfo.fullName;
        this.user!.bio = userInfo.bio;
      })
    }
    })
  }
 
  logOut(): void {
    this.auth.signOut()
      .then(()=> this.router.navigateByUrl('/login'));
  }



  
  toggleFilter(filterType: string) {
    if (filterType === 'food') {
        this.foodToggle = !this.foodToggle;
    } else if (filterType === 'drink') {
        this.drinkToggle = !this.drinkToggle;
    }

    if(this.foodToggle)
    {
      // show food items

    }
    else
    {
      // hide food items

    }

    if(this.drinkToggle)
    {
      // show drink items
      
    }
    else
    {
      // hide drink items

    }    
  }







// VENDOR LOGIN ELEMENTS AND FUNCTIONS ------------------------

  incomingorders: Order[] = [
    { vendorID: 10, number: 1, time: '2023-09-10 12:30', total: '£84', description: 'Mexican Burrito x 4' },
    { vendorID: 10, number: 2, time: '2023-09-09 15:20', total: '£50', description: 'Pizza x 2' },
    // Add more orders here
  ];

  orderhistory: Order[] = [
    { vendorID: 10, number: 1, time: '2022-08-10 15:30', total: '£25', description: 'Pizza x 1' },
    { vendorID: 10, number: 2, time: '2022-08-09 19:20', total: '£18', description: 'Caramel Latte x 2' },
    // Add more orders here
  ];

  public showVendorMainMenu: boolean = true;
  public showVendorIncomingOrders: boolean = false;
  public showVendorOrderHistory: boolean = false;
  showIncomingOrders(): void {
    this.showVendorMainMenu = false;
    this.showVendorIncomingOrders = true;
    this.showVendorOrderHistory = false;
  }
  
  showOrderHistory(): void {
    this.showVendorMainMenu = false;
    this.showVendorIncomingOrders = false;
    this.showVendorOrderHistory = true;
  }
  
  goBackToMainMenuFromIncomingOrders(): void {
    this.showVendorMainMenu = true;
    this.showVendorIncomingOrders = false;
  }
  
  goBackToMainMenuFromOrderHistory(): void {
    this.showVendorMainMenu = true;
    this.showVendorOrderHistory = false;
  }







}
  
  
