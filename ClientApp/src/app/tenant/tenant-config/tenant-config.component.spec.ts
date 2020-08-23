import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantConfigComponent } from './tenant-config.component';

describe('TenantConfigComponent', () => {
  let component: TenantConfigComponent;
  let fixture: ComponentFixture<TenantConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
