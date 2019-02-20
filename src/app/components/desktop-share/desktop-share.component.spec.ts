/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DesktopShareComponent } from './desktop-share.component';

describe('DesktopShareComponent', () => {
  let component: DesktopShareComponent;
  let fixture: ComponentFixture<DesktopShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
