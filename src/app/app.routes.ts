import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { DashboardComponent as AdminDashboard } from './modules/admin/components/dashboard/dashboard.component';
import { DashboardComponent as EmployeeDashboard } from './modules/employee/components/dashboard/dashboard.component';
import { PostTaskComponent } from './modules/admin/components/post-task/post-task.component';
import { UpdateTaskComponent } from './modules/admin/components/update-task/update-task.component';
import { ViewTaskDetailsComponent as AdminTaskDetails } from './modules/admin/components/view-task-details/view-task-details.component';

import { ViewTaskDetailsComponent as EmployeeTaskDetails } from './modules/employee/components/view-task-details/view-task-details.component';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((e) => e.AdminModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employee/employee.module').then(
        (e) => e.EmployeeModule
      ),
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboard,
  },
  {
    path: 'admin/task',
    component: PostTaskComponent,
  },
  {
    path: 'employee/dashboard',
    component: EmployeeDashboard,
  },
  {
    path: 'employee/task-details/:id',
    component: EmployeeTaskDetails,
  },
  {
    path: 'admin/task/:id/edit',
    component: UpdateTaskComponent,
  },
  {
    path: 'admin/task-details/:id',
    component: AdminTaskDetails,
  },
];
