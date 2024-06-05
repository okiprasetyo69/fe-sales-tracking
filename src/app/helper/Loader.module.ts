import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OauthService } from '../services/oauth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    // ApiService,
    // MenuService,
    OauthService,
  ],
})
export class LoaderModule {
}
