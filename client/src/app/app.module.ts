import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthServiceService } from './auth-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumComponent } from './forum/forum.component';
import { AuthGuard } from './_gaurds';
import { DatabaseService } from './database.service';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForumComponent,
    HomeComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthServiceService, AuthGuard, DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
