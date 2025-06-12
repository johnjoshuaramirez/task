import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-update-task',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatDatepicker,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatSelectModule,
    MatButton,
    MatError,
    MatOption,
    NgIf,
    NgFor,
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss',
})
export class UpdateTaskComponent implements OnInit {
  id!: number;
  updateTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ['LOW', 'MEDIUM', 'HIGH'];
  listOfTaskStatus: any = ['PENDING', 'INPROGRESS', 'COMPLETED', 'DEFERRED', 'CANCELLED'];

  constructor(
    private service: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);

    this.getTaskById();
    this.getUsers();

    this.updateTaskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]],
    });
  }

  getTaskById() {
    this.service.getTaskById(this.id).subscribe((res) => {
      this.updateTaskForm.patchValue(res);
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
    });
  }

  updateTask() {
    this.adminService
      .updateTask(this.id, this.updateTaskForm.value)
      .subscribe((res) => {
        console.log("Request Body: ", this.updateTaskForm.value);
        console.log("Request Parameter: ", this.id);
        if (res.id != null) {
          this.snackbar.open('Task updated successfully', 'Close', {
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackbar.open('Something went wrong', 'ERROR', {
            duration: 5000,
          });
        }
      });
  }
}
