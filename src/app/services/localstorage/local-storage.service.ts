import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

import {ObjectCannedACL, PutObjectCommand, S3, S3Client} from "@aws-sdk/client-s3";


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly bucketName = 'memrai2024';
  private readonly region = 'nyc3';
  private readonly accessKeyId = environment.space_access_key;
  private readonly secretAccessKey = environment.space_secret;
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: "https://nyc3.digitaloceanspaces.com",
      forcePathStyle: false,
      region: "nyc3", //'us-east-1',
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey
      }
    });
  }

  set(key: string, value: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    } else {
      console.warn('localStorage is not available');
    }
  }

  getToken(key: string): any {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } else {
      console.warn('localStorage is not available');
      return null;
    }
  }

  get(key: string): any {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    } else {
      console.warn('localStorage is not available');
      return null;
    }
  }

  clear() {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    } else {
      console.warn('localStorage is not available');
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  async uploadFile_(file: File, folderPath: string): Promise<any> {
    const params = {
      Bucket: environment.memrai_bucket,
      Key: `${folderPath}/${file.name}`,
      Body: file,
      ACL: 'public-read' as ObjectCannedACL
    };

    try {
      const data = await this.s3Client.send(new PutObjectCommand(params));
      console.log(`Successfully uploaded object: ${params.Bucket}/${params.Key}`);
      return data;
    } catch (err) {
      console.error("Error uploading file", err);
      throw err;
    }
  }

}
