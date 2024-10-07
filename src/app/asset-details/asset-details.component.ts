import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { Asset, AssetType } from '../models/asset';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AssetComponent } from '../asset/asset.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
  standalone: true,
  imports: [AssetComponent, CommonModule],
})
export class AssetDetailsComponent implements OnInit {
  assetTagId!: number;
  asset!: AssetType;
  form!: FormGroup;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.assetTagId = +this.route.snapshot.paramMap.get('assetTagId')!;
    this.getAssetDetails(this.assetTagId);
  }

  getAssetDetails(assetTagId: number) {
    this.assetService.getAssets().subscribe(
      (assets) => {
        this.asset =
          assets.find((item) => item.assetTagId === assetTagId) ?? new Asset();

        // Create the form after fetching the asset
        this.form = this.formBuilder.group(this.asset);
        this.loading = false;
      },
      (error) => {
        // Handle errors, e.g., show a 404 not found page
        console.error('Error fetching asset:', error);
        this.loading = false;
        // Redirect to a 404 page or display an error message
      }
    );
  }

  saveAsset() {
    // Handle form submission and updates
    console.log(this.form, this.asset);
  }
}
