import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-course.component.html',
  styleUrl: './progress-course.component.css'
})

export class ProgressCourseComponent {
  @Input() title: string = 'Título Padrão';
  @Input() progress: number = 0;

  ngOnInit(): void {
  }

}