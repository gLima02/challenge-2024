import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ProgressCourseComponent } from "../progress-course/progress-course.component";
import { UserService } from '../../services/login-service.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NavBarComponent, ProgressCourseComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

  loggedInUserName: string | null = '';

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.userService.getLoggedInUserName().subscribe(userName => {
      this.loggedInUserName = userName;
      console.log('Logged in user Name:', userName);
    });

    if (typeof document !== 'undefined') {
      const nomeUser = document.querySelector('.nome-user') as HTMLElement;
      nomeUser.innerHTML = `Olá, ${this.loggedInUserName}!<br />Bem-Vindo ao<br />novo OnBoarding!`
    }

  }

}
