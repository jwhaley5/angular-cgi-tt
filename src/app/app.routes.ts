import { Routes } from '@angular/router';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AppComponent } from './app.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetComponent } from './asset/asset.component';
export const routes: Routes = [
  { path: 'asset/:assetTagId', component: AssetDetailsComponent },
  { path: 'employee/:assignedTo', component: EmployeeDetailsComponent },
  { path: 'newAsset', component: AssetComponent },
  { path: '', component: AssetListComponent }, // Default route
  { path: '**', component: AssetListComponent }, // Wildcard route to handle invalid URLs
];
