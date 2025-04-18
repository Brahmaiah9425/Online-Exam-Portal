import { Component } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  validateForm!: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]]
    });
  }
 
  


  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.register(this.validateForm.value).subscribe({
        next: (res) => {
          this.message.success('Signup successful', {
            nzDuration: 5000,
          });
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          this.message.error(error.error.message, {
            nzDuration: 5000,
          });
        }
      });
    } else {
      this.message.error('Form is invalid', {
        nzDuration: 5000,
      });
    }
  }
  
 
}