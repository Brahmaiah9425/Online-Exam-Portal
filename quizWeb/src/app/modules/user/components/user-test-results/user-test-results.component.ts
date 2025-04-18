// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TestService } from '../../services/test.service';
// import { UserStorageService } from 'src/app/auth/user-storage.service'; // Import UserStorageService

// @Component({
//   selector: 'app-user-test-results',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './user-test-results.component.html',
//   styleUrls: ['./user-test-results.component.css']
// })
// export class UserTestResultsComponent implements OnInit {
//   userId: number = 0;
//   testResults: any[] = [];

//   constructor(private testService: TestService) {}

//   ngOnInit(): void {
//     const storedUserId = UserStorageService.getUserId(); 

//     if (storedUserId) {
//       this.userId = parseInt(storedUserId, 10); 
//       this.fetchUserTestResults();
//     } else {
//       console.error('No user ID found in UserStorageService.');
//     }
//   }

//   fetchUserTestResults(): void {
//     if (this.userId > 0) { 
//       this.testService.getUserTestResults(this.userId).subscribe(
//         (data) => {
//           this.testResults = data;
//           console.log('User Test Results:', this.testResults);
//         },
//         (error) => {
//           console.error('Error fetching test results:', error);
//         }
//       );
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import { UserStorageService } from 'src/app/auth/user-storage.service';

@Component({
  selector: 'app-user-test-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-test-results.component.html',
  styleUrls: ['./user-test-results.component.css']
})
export class UserTestResultsComponent implements OnInit {
  userId: number = 0;
  testResults: any[] = [];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    const storedUserId = UserStorageService.getUserId(); 

    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10); 
      this.fetchUserTestResults();
    } else {
      console.error('No user ID found in UserStorageService.');
    }
  }

  fetchUserTestResults(): void {
    if (this.userId > 0) { 
      this.testService.getUserTestResults(this.userId).subscribe(
        (data) => {
          this.testResults = data;
          this.assignAttemptNumbers(); // Assign attempt numbers after fetching data
          console.log('User Test Results:', this.testResults);
        },
        (error) => {
          console.error('Error fetching test results:', error);
        }
      );
    }
  }

  assignAttemptNumbers(): void {
    let attemptMap = new Map();

    this.testResults.forEach((test) => {
      let key = `${test.username}-${test.testName}`; // Unique key based on student and test name
      if (!attemptMap.has(key)) {
        attemptMap.set(key, 1);
      } else {
        attemptMap.set(key, attemptMap.get(key) + 1);
      }
      test.attemptNumber = attemptMap.get(key); // Assign attempt number
    });
  }
}
