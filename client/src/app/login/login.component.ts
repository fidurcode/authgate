import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {take} from "rxjs";
import {User} from "../user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authServie: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;

      this.authServie.login(this.form.value)
        .pipe(take(1))
        .subscribe({
          next: (user: User): void => {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/dashboard']);
          },
          error: error => {
            this.loading = false;
          }
        });
    }
  }
}
