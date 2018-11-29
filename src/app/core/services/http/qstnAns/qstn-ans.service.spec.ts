import { TestBed } from '@angular/core/testing';

import { QstnAnsService } from './qstn-ans.service';

describe('QstnAnsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QstnAnsService = TestBed.get(QstnAnsService);
    expect(service).toBeTruthy();
  });
});
