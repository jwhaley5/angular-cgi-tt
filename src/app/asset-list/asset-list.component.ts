import { Component, Renderer2 } from '@angular/core';
import { AssetService } from '../services/asset.service';
import { ThemeService } from '../services/theme.service';
import { AssetType } from '../models/asset';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.scss',
})
export class AssetListComponent {
  title = 'John W';
  name: string;
  assets: AssetType[] = [];
  isDarkTheme = false; // New property to track theme state

  constructor(
    private assetService: AssetService,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {
    this.name = 'CGI Member';
  }

  ngOnInit() {
    this.getAssets(); // Get assets on component load
  }
  // demo function that creates a new asset
  public addAssetDemo() {
    let newAsset: AssetType = {};
    newAsset.assetType = 'Laptop';
    newAsset.description = 'Demo of creating a new asset';
    newAsset.assignedTo = '1234';

    this.assetService.createAsset(newAsset).subscribe(
      (asset) => {
        this.getAssets(); // refresh assets list
      },
      (error) => {}
    );
  }

  // retrieves the list of assets from mock backend
  public getAssets() {
    this.assetService.getAssets().subscribe((data) => (this.assets = data));
  }
}
