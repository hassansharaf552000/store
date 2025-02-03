import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { share } from 'rxjs';
import { SharedModule } from './shared/shared.module';
import { PurchaseRequestComponent } from './features/purchase/purchase-request/purchase-request.component';
import { PurchaseModule } from './features/purchase/purchase.module';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PurchaseModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
