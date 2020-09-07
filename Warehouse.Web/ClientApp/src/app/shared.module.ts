import { NgModule } from '@angular/core';
import {UserAvatarComponent} from "./user-avatar/user-avatar.component";
import {PreviewComponent} from "./project/job/preview/preview.component";
import {TruncatePipe} from "./truncate.pipe";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ColorPickerModule} from "ngx-color-picker";
import {ImageCropperModule} from "ngx-image-cropper";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserAvatarComponent,
    PreviewComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,

    ColorPickerModule,
    ImageCropperModule
  ],
  exports: [
    UserAvatarComponent,
    PreviewComponent,
    TruncatePipe,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,

    ColorPickerModule,
    ImageCropperModule
  ]
})
export class SharedModule { }
