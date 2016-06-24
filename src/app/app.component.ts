import { Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

import {BarChartComponent} from './bar-chart';
import {SpiderChartComponent} from './spider-chart';
import {InputBoxComponent} from './input-box';

import {AppState, SentenceState} from './store/app-types';
import {APP_SENTENCE_CHANGED, AppSentenceChangedPayload} from './store/app-actions';
import {ChartData} from './shared/'

@Component({
  moduleId: module.id,
  selector: 'voco-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [BarChartComponent, SpiderChartComponent, InputBoxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private sub: ISubscription;
  private input$ = new Subject<string>();
  data$: Observable<ChartData>;
  sentence$: Observable<string>;

  constructor(private store: Store<AppState>) {

    //map words to chart data
    this.data$ = store.select(p => p.sentence).map(m => ({
      title : "Vocals / Consonants Rate",
      series : m.words.map(m => ({
        name: m.word,
        items : [
          { tick : "Consonant", value : m.count.consonants },
          { tick : "Vocal", value : m.count.vocals }
        ]
      }))
    }));

    this.sentence$ = store.select(p => p.sentence).map(m => m.sentence);

  }

  ngOnInit() {

    this.sub = this.input$.asObservable().debounceTime(500).distinctUntilChanged().subscribe(sentence => {
      this.store.dispatch({type : APP_SENTENCE_CHANGED, payload: <AppSentenceChangedPayload>{ sentence } })
    });

    this.store.dispatch({type : APP_SENTENCE_CHANGED,
      payload: <AppSentenceChangedPayload>{ sentence : "POCKING A DEAD RACCOON IS NOT RESEARCH" }
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onInputBoxChanged(sentence: string) {
    this.input$.next(sentence);
  }

}
