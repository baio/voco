import { Component, OnInit, OnDestroy} from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";

import {BarChartComponent} from './bar-chart';
import {SpiderChartComponent} from './spider-chart';
import {InputBoxComponent} from './input-box';

import {AppState, SentenceState} from './store/app-types';
import {APP_SENTENCE_CHANGED, AppSentenceChangedPayload} from './store/app-actions';

@Component({
  moduleId: module.id,
  selector: 'voco-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [BarChartComponent, SpiderChartComponent, InputBoxComponent]
})
export class AppComponent implements OnInit, OnDestroy {

  private sub: ISubscription;
  private input$ = new Subject<string>();
  sentenceState$: Observable<SentenceState>;

  constructor(private store: Store<AppState>) {

    this.sentenceState$ = store.select(p => p.sentence);
  }

  ngOnInit() {

    this.sub = this.input$.debounceTime(500).distinctUntilChanged().subscribe(sentence =>
      this.store.dispatch({type : APP_SENTENCE_CHANGED, payload: <AppSentenceChangedPayload>{ sentence } })
    );
  }

  ngOnDestroy() {

    this.sub.unsubscribe();
  }

  onInputBoxChanged(sentence: string) {

    this.input$.next(sentence);
  }

}
