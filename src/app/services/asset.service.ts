import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Asset } from '../models/asset';

// Demo asset service class to make HTTP requests.
// The mock backend will intercept these requests and respond with a HTTP response.
@Injectable({
  providedIn: 'root',
})
export class AssetService {
  constructor(private http: HttpClient) {}

  public createAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(`${environment.api_url}/assets`, asset);
  }

  public updateAsset(asset: Asset): Observable<Asset> {
    console.log(`${environment.api_url}/assets/${asset.assetTagId}`);
    return this.http.put<Asset>(
      `${environment.api_url}/assets/${asset.assetTagId}`,
      asset
    );
  }

  public getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${environment.api_url}/assets`);
  }

  public retireAsset(id: number) {
    return this.http.delete(`${environment.api_url}/assets/${id}/retire`);
  }

  public unretireAsset(asset: Asset): Observable<Asset> {
    return this.http.delete(
      `${environment.api_url}/assets/${asset.assetTagId}/unretire`
    );
  }
}
