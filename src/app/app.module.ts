import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { DynamicDialogModule } from './services/DynamicDialogService/dynamic-dialog.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { WebRequestInterceptor } from './services/WebRequestInterceptorService/web-request-interceptor';
import { UpdateListComponent } from './pages/update-list/update-list.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    SignupPageComponent,
    UpdateListComponent,
    UpdateTaskComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
