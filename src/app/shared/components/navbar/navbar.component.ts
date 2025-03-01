import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent implements OnInit {
    private listTitles: any[] =[];
    location: Location;
    mobile_menu_visible: number = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    localStorageUser: string = localStorage.getItem('user') || '{}';
    loggedInUser!: User | null;

    private userTypeArabicMap: { [key: string]: string } = {
        'accountant': 'محاسب',
        'warehouse': 'مسؤول المستودع',
        'production_manager': 'مدير الإنتاج',
        'purchase_manager': 'مدير المشتريات'
    };

    getRoleIcon(): string {
        if (!this.loggedInUser) return 'pi-user';
        
        const iconMap: { [key: string]: string } = {
            'accountant': 'pi-wallet',
            'warehouse': 'pi-box',
            'production_manager': 'pi-cog',
            'purchase_manager': 'pi-shopping-cart'
        };
        
        return iconMap[this.loggedInUser.type] || 'pi-user';
    }

    constructor(location: Location,  private element: ElementRef, private router: Router) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
        this.loggedInUser = this.localStorageUser != '{}' ? JSON.parse(this.localStorageUser) : null;
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton?.classList.add('toggled');
        }, 500);

        body?.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton?.classList.remove('toggled');
        this.sidebarVisible = false;
        body?.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body?.classList.remove('nav-open');
            var $layer = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle?.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle?.classList.add('toggled');
            }, 430);

            var $layer2 = document.createElement('div');
            $layer2.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer2);
            }else if (body?.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer2);
            }

            setTimeout(function() {
                $layer?.classList.add('visible');
            }, 100);

            $layer2.onclick = function(this: NavbarComponent) { //asign a function
              body?.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer?.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle?.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body?.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
        if (!this.loggedInUser) return 'زائر';
        const arabicType = this.userTypeArabicMap[this.loggedInUser.type] || this.loggedInUser.type;
        return `${arabicType}`;
    }

    handleAuthAction() {
        if (this.loggedInUser) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.loggedInUser = null;
        }
        this.router.navigate(['/auth/login']);
    }
}
