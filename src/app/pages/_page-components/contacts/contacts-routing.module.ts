import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactsEditComponent } from './c/contacts-edit.component';
import { ContactsCreateComponent } from './c/contacts-create.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard'

const routes: Routes = [{
  path: '',
  component: ContactsComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'create',
      component: ContactsCreateComponent,
      data: {
        breadcrumb: 'Contacts Create',
        module: 'sales',
        feature: 'customers',
        method: 'create',
      },
    },
    {
      path: 'edit/:id',
      component: ContactsEditComponent,
      data: {
        breadcrumb: 'Contacts Edit',
        module: 'sales',
        feature: 'customers',
        method: 'edit',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule { }

export const routedComponents = [
  ContactsComponent,
  ContactsCreateComponent,
  ContactsEditComponent,
];
