import { Component, OnInit, Pipe } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    NgFor,
    MatDividerModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  listOfTasks: any = [];

  constructor(
    private service: EmployeeService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.service.getEmployeeTasksById().subscribe((res) => {
      this.listOfTasks = res;
    });
  }

  updateStatus(id: number, status: string) {
    this.service.updateStatus(id, status).subscribe((res) => {
      if (res.id != null) {
        this.snackbar.open('Task status updated successfully', 'Close', {
          duration: 5000,
        });
        this.getTasks();
      } else {
        this.snackbar.open('Getting error while updating task', 'Close', {
          duration: 5000
        });
      }
    });
  }
}
