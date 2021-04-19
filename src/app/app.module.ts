import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './portfolio/summary/summary.component';
import { AboutComponent } from './portfolio/about/about.component';
import { ContactComponent } from './portfolio/contact/contact.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestInterceptor } from './global/rest-interceptor';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LabComponent } from './portfolio/lab/lab.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './portfolio/header/header.component';
import { FooterComponent } from './portfolio/footer/footer.component';
import { MenuComponent } from './portfolio/header/menu/menu.component';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    AboutComponent,
    ContactComponent,
    PortfolioComponent,
    LabComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
