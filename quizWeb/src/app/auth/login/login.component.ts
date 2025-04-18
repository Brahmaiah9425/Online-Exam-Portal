import { Component } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../auth.service';
import { UserStorageService } from '../user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validateForm!: FormGroup;
isSuccess: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Fixed email validation
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.validateForm.invalid) {
      this.message.error('Please enter valid credentials.', { nzDuration: 5000 });
      return;
    }

    this.authService.login(this.validateForm.value).subscribe(
      res => {
        this.message.success('Login Successful.', { nzDuration: 5000 });

        const user = {
          id: res.id,
          email: this.validateForm.value.email, // Store email
          role: res.role
        };

         UserStorageService.saveUser(user);
        // if(UserStorageService.isAdminLoggedIn()){
        //   this.router.navigateByUrl('admin/dashboard')
        // }else if{
        //   this.router.navigateByUrl('user/dashboard')
        // }
        // console.log(res);

        //Redirect based on role
        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (res.role === 'USER') {
          this.router.navigate(['/user/dashboard']);
        }

      },
      error => {
        this.message.error('Invalid email or password', { nzDuration: 5000 });
      }
    );
  }
}
