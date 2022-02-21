import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faHatWizard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  icons = {
    searchIcon: faSearch,
    wizardIcon: faHatWizard,
  };

  constructor( private router: Router,) { }

  ngOnInit(): void {
  }

}
