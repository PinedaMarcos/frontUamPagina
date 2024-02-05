import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private apiUrl = 'https://api.imgbb.com/1/upload';
  private apiKey = '1a793b348fd640cf34ce09795891b42a';
  constructor(private http: HttpClient) {}
    uploadImage(image: File): Observable<any> {
      const formData = new FormData();
      formData.append('key', this.apiKey);
      formData.append('image', image);
      return this.http.post<any>(this.apiUrl, formData);

  }
}
