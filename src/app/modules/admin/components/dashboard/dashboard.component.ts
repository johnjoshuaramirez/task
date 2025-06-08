import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  listOfTasks: any = [];
  searchForm!: FormGroup;

  constructor(
    private service: AdminService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.getTasks();
    this.searchForm = this.fb.group({
      title: [null]
    })
  }

  getTasks() {
    this.service.getAllTasks().subscribe((res) => {
      this.listOfTasks = res;
    });
  }

  deleteTask(id: number) {
    this.service.deleteTask(id).subscribe((res) => {
      this.snackbar.open('Task deleted successfully', 'Close', {
        duration: 5000,
      });
      this.getTasks();
    });
  }

  searchTask() {
    const title = this.searchForm.get('title')!.value;
    console.log(title);

    if (!title) {
      this.getTasks();
    }

    this.service.searchTask(title).subscribe((res) => {
      console.log(res);
      this.listOfTasks = res;
    })
  }
}
