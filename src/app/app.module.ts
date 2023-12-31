import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list';
import { DialogModule } from '@angular/cdk/dialog';

// Created components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { DirectorComponent } from './director/director.component';
import { GenreComponent } from './genre/genre.component';
import { CarouselComponent } from './carousel/carousel.component';

const appRoutes: Routes= [
  {path: 'Welcome', component: WelcomePageComponent },
  {path: 'Movies', component: MovieCardComponent },
  {path: 'Profile', component: UserProfileViewComponent},
  {path: '', redirectTo: 'Welcome', pathMatch: 'prefix'}
]
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileViewComponent,
    NavBarComponent,
    MovieDetailsComponent,
    DirectorComponent,
    GenreComponent,
    CarouselComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule, 
    MatToolbarModule,
    MatListModule
    
  ],
  exports: [
    NavBarComponent
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    DialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
