/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TextChatComponent } from './text-chat.component';

describe('TextChatComponent', () => {
  let component: TextChatComponent;
  let fixture: ComponentFixture<TextChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
