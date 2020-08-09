import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  nameDivs: any;
  edit_search: any;
  user_email: any;
  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(location: Location, private renderer: Renderer2, private element: ElementRef, private router: Router) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.user_email = localStorage.getItem('user_email');
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

  //Yash Search Tests Functionality
  find_my_div(e) {
    this.close_all();

    var o_edit = this.gid("edit_search");
    var str_needle = e.target.value;
    str_needle = str_needle.toUpperCase();
    var searchStrings = str_needle.split(/\W/);

    if (str_needle != '') {
      for (var i = 0, len = searchStrings.length; i < len; i++) {
        var currentSearch = searchStrings[i].toUpperCase();
        if (currentSearch !== "") {
          this.nameDivs = document.getElementsByClassName("name");
          for (var j = 0, divsLen = this.nameDivs.length; j < divsLen; j++) {
            if (this.nameDivs[j].textContent.toUpperCase().indexOf(currentSearch) !== -1) {
              this.nameDivs[j].style.display = "block";
            }
          }
        }
      }
    }else{
      this.show_all();
    }

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  gid(a_id) {
    return document.getElementById(a_id);
  }

  close_all() {

    for (var i = 0; i < 999; i++) {
      var o = this.gid("user_" + i);
      if (o) {
        o.style.display = "none";
      }
    }

  }

  show_all() {

    for (var i = 0; i < 999; i++) {
      var o = this.gid("user_" + i);
      if (o) {
        o.style.display = "block";
      }
    }

  }

}
