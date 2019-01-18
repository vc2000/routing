import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }
  
  public changeSuccessMessage() {
    this._success.next(`Message successfully changed.`);
  }
  goBack(): void {
    this.location.back();
  }

}
