import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppChartComponent } from './app-chart/app-chart.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';

@NgModule({
  declarations: [
    AppComponent,
    AppChartComponent,
    WordCloudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
