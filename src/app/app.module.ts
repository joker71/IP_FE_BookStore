import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CartDetailsComponent } from './pages/cart-details/cart-details.component';
import { BooklistComponent } from './pages/booklist/booklist.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { SearchComponent } from './pages/search/search.component';
import { AsideComponent } from './pages/aside/aside.component';
import { HeaderComponent } from './pages/header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

const routers: Routes = [
    {path: 'checkout', component: CheckoutComponent},
    {path: 'cart-details', component: CartDetailsComponent},
    {path: 'books/:id', component: BookdetailComponent},
    {path: 'books', component: BooklistComponent},
    {path: 'search/:keyword', component: BooklistComponent},
    {path: 'category/:id', component: BooklistComponent},
    {path: '', redirectTo: '/books', pathMatch: 'full'},
    {path: '**', redirectTo: '/books', pathMatch:'full'}
]
@NgModule({
  declarations: [
  
    CheckoutComponent,
       CartDetailsComponent,
       BooklistComponent,
       BookdetailComponent,
       SearchComponent,
       AsideComponent,
       HeaderComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routers),
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
