import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialOrderService } from '../../services/material-order.service';

@Component({
  selector: 'app-material-order',
standalone: false,  
  templateUrl: './material-order.component.html',
  styleUrls: ['./material-order.component.scss']
})
export class MaterialOrderComponent implements OnInit {
  materialOrder: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialOrderService: MaterialOrderService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.materialOrderService.getMaterialOrder(+params['id']).subscribe(
          order => {
            console.log('Loaded material order:', order); // For debugging
            this.materialOrder = order;
          }
        );
      }
    });
  }

  goBack() {
    this.router.navigate(['/production/purchase-orders']);
  }
}
