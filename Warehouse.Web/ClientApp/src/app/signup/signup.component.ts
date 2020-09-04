import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../Models/User";
import {AuthService} from "../Services/auth.service";
import {TenantService} from "../Services/tenant.service";
import {Router} from "@angular/router";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit
{

  userFormGroup: FormGroup;
  imageChangedEvent: any;
  croppedImage: any;

  constructor (private formBuilder: FormBuilder, private authService: AuthService,private tenantService: TenantService)
  {
  }

  ngOnInit ()
  {
    this.createForm();
  }

  createForm ()
  {
    let emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.userFormGroup = this.formBuilder.group({
      'Email': [null, [Validators.required, Validators.pattern(emailRegex)]],
      'Password': [null, [Validators.required, this.checkPassword]],
      'DisplayName': [null, [Validators.required]],
      'Avatar': [null],
    });
  }

  checkPassword (control)
  {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? {'requirements': true} : null;
  }

  create (value: any)
  {
    let newUser: User = {
      email: value.Email,
      password: value.Password,
      displayName: value.DisplayName,
      avatar: value.Avatar
    };

    this.authService.CreateUser(newUser).subscribe(user =>
    {
      console.log(user);

      if (user)
      {

        console.log('logging user in', newUser.email);
        this.authService.AuthenticateUser({email: newUser.email, password: newUser.password}).subscribe(loggedIn =>
        {

        });

      }

    });
  }

  fileChangeEvent(event: any) {
    console.log("File changed");
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log("Image cropped");
    this.croppedImage = event.base64;
  }

  imageLoaded() {

  }

  cropperReady() {

  }

  loadImageFailed() {

  }
}
