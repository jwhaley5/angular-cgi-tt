import { Component, Renderer2 } from '@angular/core';
import { AssetService } from '../services/asset.service';
import { ThemeService } from '../services/theme.service';
import { AssetType } from '../models/asset';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.scss',
})
export class AssetListComponent {
  title = 'John W';
  assets: AssetType[] = [];
  filteredAssets: AssetType[] = [];
  // Filter state
  filter = {
    assetTagId: '',
    assetType: '',
    description: '',
    assignedTo: '',
    retired: '',
    dateAdded: '',
    dateRetired: '',
  };
  loading = true;

  constructor(private assetService: AssetService) {}

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
      () => {
        this.getAssets(); // refresh assets list
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Apply the filters to the list of assets
  public applyFilter() {
    this.filteredAssets = this.assets.filter((asset) => {
      const matchesTagId = this.filter.assetTagId
        ? asset.assetTagId?.toString().includes(this.filter.assetTagId)
        : true;
      const matchesType = this.filter.assetType
        ? asset.assetType
            ?.toLowerCase()
            .includes(this.filter.assetType.toLowerCase())
        : true;
      const matchesDescription = this.filter.description
        ? asset.description
            ?.toLowerCase()
            .includes(this.filter.description.toLowerCase())
        : true;
      const matchesAssignedTo = this.filter.assignedTo
        ? asset.assignedTo
            ?.toLowerCase()
            .includes(this.filter.assignedTo.toLowerCase())
        : true;
      const matchesRetired =
        this.filter.retired !== ''
          ? asset.retired?.toString() === this.filter.retired
          : true;

      // Filtering by dateAdded (if provided in the filter)
      const matchesDateAdded = this.filter.dateAdded
        ? asset.dateAdded &&
          datesEqual(new Date(asset.dateAdded), new Date(this.filter.dateAdded))
        : true;

      // Filtering by dateRetired (if provided in the filter)
      const matchesDateRetired = this.filter.dateRetired
        ? asset.dateRetired &&
          new Date(asset.dateRetired).toDateString() ===
            new Date(this.filter.dateRetired).toDateString()
        : true;

      return (
        matchesTagId &&
        matchesType &&
        matchesDescription &&
        matchesAssignedTo &&
        matchesRetired &&
        matchesDateAdded &&
        matchesDateRetired
      );
    });
  }

  public retireAsset(id: number) {
    this.assetService.retireAsset(id).subscribe(
      () => {
        this.getAssets();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // retrieves the list of assets from mock backend
  public getAssets() {
    this.assetService.getAssets().subscribe((data) => {
      this.assets = data;
      this.filteredAssets = data;
      this.loading = false;
    });
  }
}

const datesEqual = (assetDate: Date, filterDate: Date) => {
  return (
    assetDate.toDateString() ===
    new Date(filterDate.setDate(filterDate.getDate() + 1)).toDateString()
  );
};
