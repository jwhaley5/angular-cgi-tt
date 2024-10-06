import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { Asset } from '../models/asset';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
})
export class AssetDetailsComponent implements OnInit {
  assetTagId!: number;
  asset!: Asset;

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService
  ) {}

  ngOnInit() {
    this.assetTagId = +this.route.snapshot.paramMap.get('assetTagId')!;
    this.getAssetDetails(this.assetTagId);
  }

  getAssetDetails(assetTagId: number) {
    // Assuming you have a service method to fetch asset by ID
    this.assetService.getAssets().subscribe((assets) => {
      this.asset =
        assets.find((item) => item.assetTagId === assetTagId) ?? new Asset();
    });
  }
}
