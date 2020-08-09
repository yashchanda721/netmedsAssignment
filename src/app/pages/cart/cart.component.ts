import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../_Services/items.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {
    items: any;
    total: any;
    constructor(
        private _ItemService: ItemsService,
        private route: Router,
        private formBuilder: FormBuilder
    ) { }
    ngOnInit() {
        if (localStorage.getItem("user_id") === null) {
            this.route.navigate(['/login']);
        }
        this.load_cart();
    }

    onRemove(item, e) {
        if (this.items.length > 1) {
            this._ItemService.delete_selected_item({ 'id': item.select_id }).subscribe(
                res => {
                    console.log(res);
                    this.load_cart();
                });
        }

    }

    load_cart() {
        this.items = [];
        this.total = 0;
        var id = localStorage.getItem('user_id');
        this._ItemService.get_user_selected_item_list(id).subscribe(
            res => {
                console.log(res);
                this.items = res;
                for (var i in res) {
                    this.total = this.total - (-res[i]['min_price']);
                }
                this.total = this.total.toLocaleString();
            });
    }

    onPay() {
        var id = localStorage.getItem('user_id');
        this._ItemService.make_purchase(id).subscribe(
            res => {
                console.log(res);
                this.route.navigate(['/thankyou']);
            });

    }

    onBack() {
        var id = localStorage.getItem('user_id');
        this._ItemService.delete_user_selected_item_list(id).subscribe(
            res => {
                console.log(res);
                this.route.navigate(['/tests']);
            });
    }
}
