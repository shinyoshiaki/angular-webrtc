/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SignalingComponent } from './signaling.component';

describe('SignalingComponent', () => {
  let component: SignalingComponent;
  let fixture: ComponentFixture<SignalingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
