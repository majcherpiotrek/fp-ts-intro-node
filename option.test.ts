import { processCWithValidation } from './option';

import * as O from 'fp-ts/Option';

describe('option', () => {
  it('should pass using Option', () => {
    expect(processCWithValidation({})).toEqual(O.none);
    expect(processCWithValidation({ a: {} })).toEqual(O.none);
    expect(processCWithValidation({ a: { b: { c: '012345678910' } } })).toEqual(
      O.none
    );
    expect(processCWithValidation({ a: { b: { c: 'this is ok' } } })).toEqual(
      O.some({ result: 'THIS-IS-OK' })
    );
  });
});
