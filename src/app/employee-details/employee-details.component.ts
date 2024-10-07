import { Component } from '@angular/core';
import { AssetType } from '../models/asset';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
  employee!: string;
  assets: AssetType[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService
  ) {}
  ngOnInit() {
    this.employee = this.route.snapshot.paramMap.get('assignedTo')!;
    this.getAssets(this.employee);
  }

  getAssets(employee: string) {
    this.assetService.getAssets().subscribe(
      (assets) => {
        this.assets =
          assets.filter((item) => item.assignedTo === employee) ?? [];
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
  public retireAsset(id: number) {
    this.assetService.retireAsset(id).subscribe(
      () => {
        this.getAssets(this.employee);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
