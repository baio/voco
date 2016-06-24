/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement, NgZone } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { HighchartComponent } from './highchart.component';

describe('Component: Highchart', () => {
  it('should create an instance', () => {
    let component = new HighchartComponent(null, null);
    expect(component).toBeTruthy();
  });
});
