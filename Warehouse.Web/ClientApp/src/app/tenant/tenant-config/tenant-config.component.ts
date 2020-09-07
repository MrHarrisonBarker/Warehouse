import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tenant-config',
  templateUrl: './tenant-config.component.html',
  styleUrls: ['./tenant-config.component.css']
})
export class TenantConfigComponent implements OnInit
{
  activeConfig: string = 'basic';

  constructor ()
  {
  }

  ngOnInit ()
  {
  }
}
