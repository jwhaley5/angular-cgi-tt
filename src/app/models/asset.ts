export type AssetType = {
  assetTagId?: number;
  assetType?:
    | 'Desktop'
    | 'Laptop'
    | 'Display'
    | 'Phone'
    | 'External Hard Drive'
    | 'Other';
  description?: string;
  assignedTo?: string;
  dateAdded?: Date;
  retired?: boolean;
  dateRetired?: Date;
};

export class Asset {
  public assetTagId?: number;
  public assetType?:
    | 'Desktop'
    | 'Laptop'
    | 'Display'
    | 'Phone'
    | 'External Hard Drive'
    | 'Other';
  public description?: string;
  public assignedTo?: string;
  public dateAdded?: Date;
  public retired?: boolean;
  public dateRetired?: Date;

  constructor() {}
}
