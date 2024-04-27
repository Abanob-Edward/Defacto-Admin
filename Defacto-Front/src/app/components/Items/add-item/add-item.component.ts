import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../../../Models/iitem';
import { ColorService } from '../../../services/color.service';
import { SizeService } from '../../../services/size.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {
  sizes: any[] = [];
  colors: any[] = [];
  item: IItem = {
    id: 0,
    isForDefacto: true,
    quantity: 0,
    price: 0,
    sizeID: null,
    sizeName: '',
    sizeCode: '',
    colorID: 0,
    colorName: '',
    colorHEX: '',
    productID: 0
  };

  constructor(private location: Location, private route: ActivatedRoute, private itemService: ItemService, private _ColorService: ColorService, private _SizeService: SizeService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.item.productID = +(params.get('id') ?? '0');
    });

    this._SizeService.getAllSizes().subscribe(sizes => {
      this.sizes = sizes.entities;
    });

    this._ColorService.getColors().subscribe(colors => {
      this.colors = colors.entities;
    });



  }

  addItem(): void {
    this.itemService.addItem(this.item).subscribe({
      next: (response) => {
        // Navigate back to the previous page after successfully adding the item
        this.location.back();
      },
      error: (error) => {
        // console.log(error);
        // this.location.back();
      }
    });
  }

  goBack() {
    this.location.back();
  }

}