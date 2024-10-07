import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AssetType } from '../models/asset';
import { CommonModule } from '@angular/common';
import { AssetService } from '../services/asset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'], // Update to use styleUrls
})
export class AssetComponent implements OnInit {
  form!: FormGroup;
  @Input() asset?: AssetType; // Make `asset` an optional input property
  loading = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private assetService: AssetService
  ) {}

  ngOnInit() {
    if (this.asset) {
      console.log(this.asset);
      this.form = this.formBuilder.group({
        assetTagId: [{ value: this.asset.assetTagId, disabled: true }],
        assetType: [{ value: this.asset.assetType, disabled: true }],
        description: [this.asset.description, Validators.required],
        assignedTo: [this.asset.assignedTo],
        dateAdded: [
          {
            value: this.asset.dateAdded?.toISOString().slice(0, 10),
            disabled: true,
          },
        ], // Convert to ISO string
        retired: [{ value: this.asset.retired, disabled: this.asset.retired }],
        dateRetired: [
          {
            value: this.asset.dateRetired?.toISOString().slice(0, 10),
            disabled: true,
          },
        ],
      });
    } else {
      this.form = this.formBuilder.group({
        assetTagId: [{ value: '', disabled: true }, Validators.required],
        assetType: ['', Validators.required],
        description: ['', Validators.required],
        assignedTo: [''],
        dateAdded: ['', Validators.required],
        retired: [false],
        dateRetired: [''],
      });
    }
  }

  public save(): void {
    this.loading = true;
    const formSubmission = this.form.value;
    let assetSubmission: AssetType = { ...this.asset, ...formSubmission };

    // if the asset has a tag id, then it already exists in the db
    if (!this.asset?.assetTagId) {
      this.assetService.createAsset(assetSubmission).subscribe(
        (item) => {
          this.loading = false;
          this.router.navigate([`/asset/${item.assetTagId}`]);
        },
        (error) => console.log(error)
      );
    }
    // else create a new asset
    else {
      this.assetService.updateAsset(assetSubmission).subscribe(
        (item) => {
          if (assetSubmission.retired && !this.asset?.retired) {
            console.log('should retire');
            this.retireAsset(this.asset?.assetTagId ?? 0);
          }
          if (!assetSubmission.retired && this.asset?.retired) {
            this.unretireAsset(this.asset);
          }
          this.loading = false;
        },
        (error) => console.log(error)
      );
    }
  }

  public retireAsset(id: number) {
    console.log(id);
    this.assetService.retireAsset(id).subscribe(
      () => {
        console.log('finished');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public unretireAsset(asset: AssetType) {
    console.log(asset.assetTagId);
    this.assetService.unretireAsset(asset);
  }
}
