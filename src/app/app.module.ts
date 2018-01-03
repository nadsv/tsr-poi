import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AddModule } from './add/add.module';
import { FindModule } from './find/find.module';
import { ExportModule } from './export/export.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { TsrPoiService } from './shared/tsr-poi.service';
import { RoutingModule } from './app.routing';
import { SearchParamsService } from './shared/search-params.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AddModule,
    FindModule,
    ExportModule,
    CoreModule,
    HttpModule,
    AuthModule,
    RoutingModule,
    BrowserModule
  ],
  providers: [TsrPoiService, SearchParamsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
