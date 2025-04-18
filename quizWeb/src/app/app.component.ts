import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { UserStorageService } from './auth/user-storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification'; // ✅ Import service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterOutlet],
  providers: [NzNotificationService], // ✅ Fix: Provide the service
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quizWeb';
  isUserLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router, private notification: NzNotificationService) {} // ✅ Inject service

  ngOnInit() {
    this.checkLoginStatus();
    this.router.events.subscribe(() => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    this.isUserLoggedIn = UserStorageService.isUserLoggedIn();
    this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
    this.notification.success('Logout Successful', 'You have been logged out.'); // ✅ Use notification
  }
}
