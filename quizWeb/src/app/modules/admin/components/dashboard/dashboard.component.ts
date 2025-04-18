import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tests = [];
  filteredTests = [];
  searchText: string = '';  // Store search query

  constructor(private testService: AdminService, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.getAllTests();
  }

  getAllTests(): void {
    this.testService.getAllTest().subscribe(
      res => {
        this.tests = res;
        this.filteredTests = res;  // Initialize filtered list with all tests
      },
      error => {
        this.notification.error(
          'ERROR',
          'Something went wrong. Try again.',
          { nzDuration: 5000 }
        );
      }
    );
  }

  onSearchChange(): void {
    if (this.searchText.trim() === '') {
      this.filteredTests = this.tests;  // If search text is empty, show all tests
    } else {
      this.filteredTests = this.tests.filter(test =>
        test.title.toLowerCase().includes(this.searchText.toLowerCase())  // Filter based on test title
      );
    }
  }

  getFormattedTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }
}