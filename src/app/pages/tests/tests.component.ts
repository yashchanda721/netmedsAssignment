import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../_Services/items.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'tests.component.html'
})

export class TestsComponent implements OnInit {
  items: any = {};
  userArrShowAr: any;
  userAddForm: FormGroup;
  
  constructor(
    private _ItemService: ItemsService,
    private route: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if(localStorage.getItem("user_id") === null){
      this.route.navigate(['/login']);
    }
    this.items = [];
    this.userArrShowAr = [];
    
    this.userAddForm = this.formBuilder.group({
      item_ids: [''],
      user_id: localStorage.getItem('user_id')
    });
    this._ItemService.get_item_list().subscribe(
      res => {
        this.items = res;
      });
  }

  onSubmit() {
    var id =localStorage.getItem('user_id');
    this._ItemService.add_user_items(this.userAddForm.value,id)
      .subscribe(
        res => {

          this.route.navigate(['/cart']);
        });
  }

  onCheckChangeAr(user, event) {
    /* Selected */
    if (event.target.checked) {
      this.userArrShowAr.push(user.id);
    }
    /* unselected */
    else {
      var index = this.userArrShowAr.indexOf(user.id);
      if (index > -1) {
        this.userArrShowAr.splice(index, 1);
      }
    }
    this.userAddForm.get('item_ids').setValue(this.userArrShowAr.toString());
  }
}
