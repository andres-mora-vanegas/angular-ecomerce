import { TestBed, inject } from '@angular/core/testing';

import { RouterModalService } from './router-modal.service';

describe('RouterModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterModalService]
    });
  });

  it('should be created', inject([RouterModalService], (service: RouterModalService) => {
    expect(service).toBeTruthy();
  }));
});
