import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-task-details',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss',
})
export class ViewTaskDetailsComponent {
  taskId: number;
  taskData: any;
  comments: any;
  commentForm!: FormGroup;

  constructor(
    private service: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskId = this.activatedRoute.snapshot.params['id'];
    this.getTaskById();
    this.getComments();
    this.commentForm = this.fb.group({
      content: [null, Validators.required],
    });
  }

  getTaskById() {
    this.service.getTaskById(this.taskId).subscribe((res) => {
      this.taskData = res;
    });
  }

  getComments() {
    this.service.getCommentsByTask(this.taskId).subscribe((res) => {
      this.comments = res;
    });
  }

  publishComment() {
    this.service
      .createComment(this.taskId, this.commentForm.get('content')?.value)
      .subscribe((res) => {
        if (res.id != null) {
          this.snackbar.open('Comment posted successfully', 'Close', {
            duration: 5000,
          });
          this.getComments();
        } else {
          this.snackbar.open('Something went wrong', 'Close', {
            duration: 5000,
          });
        }
      });
  }
}
