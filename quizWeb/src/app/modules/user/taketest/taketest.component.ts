// import { Component } from '@angular/core';
// import { SharedModule } from '../../shared/shared.module';
// import { TestService } from '../services/test.service';
// import { ActivatedRoute } from '@angular/router';
// import { NzMessageService } from 'ng-zorro-antd/message';
// import { UserStorageService } from 'src/app/auth/user-storage.service';

// @Component({
//   selector: 'app-taketest',
//   standalone: true,
//   imports: [SharedModule],
//   templateUrl: './taketest.component.html',
//   styleUrls: ['./taketest.component.css']
// })
// export class TaketestComponent {
//   testId: number | null = null;
//   questions: any[] = [];
//   selectedAnswers: { [key: number]: string } = {};
//   timeRemaining: number = 0;
//   interval: any;
//   isTestSubmitted: boolean = false;

//   constructor(
//     private testService: TestService,
//     private activatedRoute: ActivatedRoute,
//     private message: NzMessageService
//   ) {}

//   ngOnInit(): void {
//     this.activatedRoute.paramMap.subscribe(params => {
//       this.testId = Number(params.get('id'));
//       console.log("Test ID from route:", this.testId);

//       if (!isNaN(this.testId) && this.testId > 0) {
//         this.loadTestQuestions();
//       } else {
//         this.message.error("Invalid test ID");
//       }
//     });
//   }

//   loadTestQuestions(): void {
//     this.testService.getTestQuestions(this.testId).subscribe(
//       res => {
//         this.questions = res.questions;
//         this.timeRemaining = res.testDTO?.time || 0;
//         console.log("Loaded questions:", this.questions);
//         console.log("Time remaining fetched from backend:", this.timeRemaining);  
//         this.startTimer();
//       },
//       error => {
//         console.error("Error fetching questions:", error);
//         this.message.error("Failed to load test questions.");
//       }
//     );
//   }

//   startTimer(): void {
//     this.interval = setInterval(() => {
//       if (this.timeRemaining > 0) {
//         this.timeRemaining--;
//       } else {
//         clearInterval(this.interval);
//         this.submitAnswers(); 
//       }
//     }, 1000);
//   }

//   stopTimer(): void {
//     clearInterval(this.interval);
//   }

//   getFormattedTime(): string {
//     const minutes = Math.floor(this.timeRemaining / 60);
//     const seconds = this.timeRemaining % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   }

//   onAnswerChange(questionId: number, selectedOption: string): void {
//     this.selectedAnswers[questionId] = selectedOption;
//     console.log("Selected Answers:", this.selectedAnswers);
//   }

//   submitAnswers(): void {
//     if (this.isTestSubmitted) {
//       return;
//     }
  
//     const answerList = Object.keys(this.selectedAnswers).map(questionId => ({
//       questionId: +questionId,
//       selectedOption: this.selectedAnswers[questionId].trim().toUpperCase() // ✅ Convert answer to uppercase
//     }));
  
//     const data = {
//       testId: Number(this.testId),
//       userId: UserStorageService.getUserId(),
//       responses: answerList
//     };
  
//     console.log("🚀 Submitting Data:", JSON.stringify(data, null, 2));
  
//     this.stopTimer();
//     this.isTestSubmitted = true;
  
//     this.testService.submitTest(data).subscribe(
//       res => {
//         console.log("✅ Response from Backend:", res);
//         this.message.success('Test submitted successfully', { nzDuration: 5000 });
//       },
//       error => {
//         console.error("❌ Submission error:", error);
//         this.message.error(error?.error?.message || 'Test submission failed', { nzDuration: 5000 });
//       }
//     );
//   }
// }
import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TestService } from '../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserStorageService } from 'src/app/auth/user-storage.service';

@Component({
  selector: 'app-taketest',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './taketest.component.html',
  styleUrls: ['./taketest.component.css']
})
export class TaketestComponent {
  testId: number | null = null;
  questions: any[] = [];
  selectedAnswers: { [key: number]: string } = {};
  timeRemaining: number = 0;
  interval: any;
  isTestSubmitted: boolean = false;
String: any;

  constructor(
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private router: Router // ✅ Inject Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.testId = Number(params.get('id'));
      console.log("Test ID from route:", this.testId);

      if (!isNaN(this.testId) && this.testId > 0) {
        this.loadTestQuestions();
      } else {
        this.message.error("Invalid test ID");
      }
    });
  }

  loadTestQuestions(): void {
    this.testService.getTestQuestions(this.testId).subscribe(
      res => {
        this.questions = res.questions;
        this.timeRemaining = res.testDTO?.time || 0;
        console.log("Loaded questions:", this.questions);
        console.log("Time remaining fetched from backend:", this.timeRemaining);  
        this.startTimer();
      },
      error => {
        console.error("Error fetching questions:", error);
        this.message.error("Failed to load test questions.");
      }
    );
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        clearInterval(this.interval);
        this.submitAnswers(); 
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  onAnswerChange(questionId: number, selectedOption: string): void {
    this.selectedAnswers[questionId] = selectedOption;
    console.log("Selected Answers:", this.selectedAnswers);
  }

  submitAnswers(): void {
    if (this.isTestSubmitted) {
      return;
    }
  
    const answerList = Object.keys(this.selectedAnswers).map(questionId => ({
      questionId: +questionId,
      selectedOption: this.selectedAnswers[questionId].trim().toUpperCase() // ✅ Convert answer to uppercase
    }));
  
    const data = {
      testId: Number(this.testId),
      userId: UserStorageService.getUserId(),
      responses: answerList
    };
  
    console.log("🚀 Submitting Data:", JSON.stringify(data, null, 2));
  
    this.stopTimer();
    this.isTestSubmitted = true;
  
    this.testService.submitTest(data).subscribe(
      res => {
        console.log("✅ Response from Backend:", res);
        this.message.success('Test submitted successfully', { nzDuration: 5000 });

        // ✅ Navigate to the test results page after submission
        console.log("Navigating to: /user/view-test-results");
        this.router.navigate(['/user/view-test-results']).then(success => {
          if (success) {
            console.log("✅ Navigation Successful");
          } else {
            console.error("❌ Navigation Failed");
          }
        });
      },
      error => {
        console.error("❌ Submission error:", error);
        this.message.error(error?.error?.message || 'Test submission failed', { nzDuration: 5000 });
      }
    );
  }
}
