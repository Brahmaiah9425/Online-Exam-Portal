import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AdminService } from '../../service/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  testForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, [Validators.required]],
      time: [null, [Validators.required]],
    });
  }

  // submitForm(): void {
  //   if (this.testForm.valid) {
  //     console.log("Submitting Test Form:", this.testForm.value);
  //     this.adminService.createTest(this.testForm.value).subscribe(
  //       res => {
  //         this.notification.success(
  //           'SUCCESS',
  //           'Test created successfully.',
  //           { nzDuration: 5000 }
  //         );
  //         this.router.navigate(['/admin/dashboard']);
  //       }
        // error => {
        //   this.notification.error(
        //     'ERROR',
        //     error.error ? error.error : 'An error occurred while creating the test.',
        //     { nzDuration: 5000 }
        //   );
        
        // }
        
//       );
//     } else {
//       this.notification.error(
//         'ERROR',
//         'Please fill in all required fields.',
//         { nzDuration: 5000 }
//       );
//     }
//   }
// }
submitForm(): void {
  if (this.testForm.valid) {
    console.log("Submitting Test Form:", this.testForm.value);

    this.adminService.createTest(this.testForm.value).subscribe(
      res => {
        console.log("Response from API:", res);
        this.notification.success('SUCCESS', 'Test created successfully.', { nzDuration: 5000 });
        this.router.navigate(['/admin/dashboard']);
      },
      error => {
        console.error("API Error:", error);
        this.notification.error('ERROR', error.error?.message || 'An error occurred while creating the test.', { nzDuration: 5000 });
      }
    );
  } else {
    this.notification.error('ERROR', 'Please fill in all required fields.', { nzDuration: 5000 });
  }
}

}
