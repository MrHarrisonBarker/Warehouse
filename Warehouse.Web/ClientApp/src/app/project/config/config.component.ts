import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../Services/project.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit
{

  constructor (public projectService: ProjectService)
  {
  }

  ngOnInit ()
  {
  }

}
