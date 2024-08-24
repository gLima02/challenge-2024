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

  progressText() {
    const textProg = document.querySelector('#progress-text') as HTMLElement
    if (this.progress == 100) {
      textProg.innerHTML = `Concluído
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2-circle"
        viewBox="0 0 16 16">
        <path
          d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
      </svg>`
    }
  }

  ngOnInit(): void {
    this.progressText();
  }

}