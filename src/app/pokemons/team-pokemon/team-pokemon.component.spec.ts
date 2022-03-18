import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPokemonComponent } from './team-pokemon.component';

describe('TeamPokemonComponent', () => {
  let component: TeamPokemonComponent;
  let fixture: ComponentFixture<TeamPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
