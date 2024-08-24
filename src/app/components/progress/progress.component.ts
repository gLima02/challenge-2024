import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ProgressCourseComponent } from "../progress-course/progress-course.component";

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NavBarComponent, ProgressCourseComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

}
