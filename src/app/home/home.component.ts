import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  numbersOnSubscription: Subscription;
  customOnSubscription: Subscription;

  ngOnDestroy() {
    this.customOnSubscription.unsubscribe();
    this.numbersOnSubscription.unsubscribe();
  }
  constructor() { }

  ngOnInit() {

    const myNumber = Observable.interval(1000);
    this.numbersOnSubscription = myNumber.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first package')
        }, 2000);
        setTimeout(() => {
          observer.next('second package')
        }, 4000);
        setTimeout(() => {
          observer.complete();
        }, 5000);
        setTimeout(() => {
          observer.error('this does not work');
        }, 5000);
      });
    this.customOnSubscription = myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log("completed"); }
    );
  }
}
