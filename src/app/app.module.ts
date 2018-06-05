import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { NavHighlightsComponent } from './nav-highlights/nav-highlights.component';
import { NavPressKitComponent } from './nav-press-kit/nav-press-kit.component';
import { OverviewComponent } from './overview/overview.component';
import { InsightsComponent } from './insights/insights.component';
import { ReportsComponent } from './reports/reports.component';
import { PresentationComponent } from './presentation/presentation.component';
import { PressReleaseComponent } from './press-release/press-release.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { DataService } from './shared/data.service';
import { CpsComponent } from './cps/cps.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NavHighlightsComponent,
    NavPressKitComponent,
    OverviewComponent,
    InsightsComponent,
    ReportsComponent,
    PresentationComponent,
    PressReleaseComponent,
    ContactUsComponent,
    CpsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
