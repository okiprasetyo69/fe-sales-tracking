import { NgModule } from '@angular/core';
import { NotimePipe } from './ExtraPipes';

@NgModule({
  declarations: [ NotimePipe ],
  exports: [ NotimePipe ],
})
export class HelperModule {
  static forRoot() {
    return {
      ngModule: HelperModule,
      providers: [],
    }
  }
}
