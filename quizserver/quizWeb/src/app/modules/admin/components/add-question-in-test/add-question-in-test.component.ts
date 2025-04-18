import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-question-in-test',
  standalone: true,
  imports: [
    SharedModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule  
  ],
  templateUrl: './add-question-in-test.component.html',
  styleUrls: ['./add-question-in-test.component.css']
})
export class AddQuestionInTestComponent implements OnInit {
  questionForm!: FormGroup;
  id: number | null = null;

  constructor(
    public fb: FormBuilder,
    private adminService: AdminService,
    private notification: NzNotificationService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      questionText: [null, [Validators.required]],
      optionA: [null, [Validators.required]],
      optionB: [null, [Validators.required]],
      optionC: [null, [Validators.required]],
      optionD: [null, [Validators.required]],
      correctOption: [null, [Validators.required]],
    });

    this.id = this.activatedRoute.snapshot.params['id'];
  }

  submitForm() {
    if (this.questionForm.invalid) {
      return;
    }

    const questionDto = {
      questionText: this.questionForm.value.questionText.trim(),
      optionA: this.questionForm.value.optionA.trim(),
      optionB: this.questionForm.value.optionB.trim(),
      optionC: this.questionForm.value.optionC.trim(),
      optionD: this.questionForm.value.optionD.trim(),
      correctOption: this.questionForm.value.correctOption.trim().toUpperCase(), // Fix: Convert to uppercase
      id: this.id,
    };

    console.log("Submitting Question:", questionDto);

    this.adminService.addQuestionInTest(questionDto).subscribe(
      () => {
        this.notification.success('SUCCESS', 'Question Created Successfully.', {
          nzDuration: 5000,
        });
        this.router.navigateByUrl('/admin/dashboard');
      },
      (error) => {
        this.notification.error('ERROR', error.error || 'Something went wrong!', {
          nzDuration: 5000,
        });
      }
    );
  }
}
