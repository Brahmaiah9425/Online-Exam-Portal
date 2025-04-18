import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { AdminService } from '../../service/admin.service'; 

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit {
  questions: any[] = [];
  testId!: number; // Dynamic testId

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute // Inject route service
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testId = +params['id']; // Get testId from URL
      if (!isNaN(this.testId)) {
        this.fetchTestQuestions(this.testId);
      } else {
        console.error('Invalid test ID');
      }
    });
  }

  fetchTestQuestions(testId: number): void {
    this.adminService.getTestQuestions(testId).subscribe(
      (data) => {
        console.log('API Response:', data);
        this.questions = data?.questions || [];
      },
      (error) => {
        console.error('Error fetching test questions:', error);
      }
    );
  }
}
