import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../_Services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  items: any = {};
  total:any;
  constructor(private route: Router,private _ItemService: ItemsService) { }

  ngOnInit(): void {
    this.items = [];
    this.total=0;
    if (localStorage.getItem("user_id") === null) {
      this.route.navigate(['/login']);
    }
    var id = localStorage.getItem('user_id');
        this._ItemService.get_user_purchased_item_list(id).subscribe(
            res => {
                console.log(res);
                this.items = res;
                for (var i in res) {
                    this.total = this.total - (-res[i]['min_price']);
                }
                this.total = this.total.toLocaleString();
            });
    
  }

  onBack() {
    this.route.navigate(['/tests']);
  }

}
