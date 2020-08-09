import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../_Services/items.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userData: any = {};
  submitted = false;
  constructor(private _ItemService: ItemsService,
    private route: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    var userdata = this.loginForm.value;

    this._ItemService.loginUser(userdata).subscribe(
      res => {

        if (res) {
          localStorage.clear();
          localStorage.setItem('user_id', res[0].id);
          localStorage.setItem('user_email', userdata.email);
          this.route.navigate(['/tests']);
        }
      });
  }

}
