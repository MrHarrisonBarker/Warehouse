import { Component, OnInit } from '@angular/core';
import {ModuleService} from "../../Services/module.service";
import {ProjectService} from "../../Services/project.service";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  public isLoading: boolean = false;

  constructor(
    public moduleService: ModuleService,
    private projectService: ProjectService
    ) { }

  ngOnInit()
  {
    this.moduleService.GetModulesAsync(this.projectService.currentProjectId).subscribe(modules => {
      if (modules)
      {
        this.isLoading = true;
      }
    });
  }

}
