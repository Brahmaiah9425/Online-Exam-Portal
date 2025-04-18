import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminService } from '../service/admin.service';

import { NzTableModule } from 'ng-zorro-antd/table';


@Component({
  selector: 'app-view-test-results',
  standalone:true,
  imports: [SharedModule,NzTableModule],
  templateUrl: './view-test-results.component.html',
  styleUrl: './view-test-results.component.css'
})
export class ViewTestResultsComponent {
  resultsData: any;

  constructor(private testService: AdminService) {}

  ngOnInit() {
    this.getTestResults();
  }

  getTestResults() {
    this.testService.getTestResults().subscribe(
      (res) => {
        this.resultsData = res;
        console.log(this.resultsData);
      }
    );
  }

}
