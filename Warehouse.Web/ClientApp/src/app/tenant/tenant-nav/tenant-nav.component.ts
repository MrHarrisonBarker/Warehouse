import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'tenant-nav',
  templateUrl: './tenant-nav.component.html',
  styleUrls: ['./tenant-nav.component.css']
})
export class TenantNavComponent implements OnInit
{

  constructor (public authService: AuthService, public router: Router)
  {
  }

  ngOnInit ()
  {
  }

}
