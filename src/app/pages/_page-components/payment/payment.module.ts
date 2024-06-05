import { NgModule } from '@angular/core';

import { PaymentRoutingModule, routedComponents } from './payment-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import 'style-loader!angular2-toaster/toaster.css';
import { HeaderDetailModule } from '../../_shared-components/header-detail/header-detail.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { PaymentService } from '../../../services/payment.service';
import { BranchService } from '../../../services/branch.service';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { IndexTableModule } from '../../_shared-components/index-table/index-table.module';


@NgModule({
    imports: [
        ThemeModule,
        PaymentRoutingModule,
        ToasterModule.forRoot(),
        DataTablesModule,
        HeaderDetailModule,
        FormLoadingModule,
        LoaderModule,
        FormImportModule,
        FormInputMdModule,
        DevModeModule,
        NgxMyDatePickerModule.forRoot(),
        IndexTableModule,
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        PaymentService,
        BranchService,
    ],
})
export class PaymentModule {
}
