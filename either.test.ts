import { safeParseFloat, safeParseInt } from './either';

import * as E from 'fp-ts/Either';

describe('either', () => {
  it('safeParseFloat', () => {
    expect(safeParseFloat('abc')).toEqual(E.left("'abc' is not a number!"));
    expect(safeParseFloat('1.5')).toEqual(E.right(1.5));
    expect(safeParseFloat('150')).toEqual(E.right(150));
  });

  it('safeParseInt', () => {
    expect(safeParseInt(null)).toEqual(E.left("'null' is not a string!"));
    expect(safeParseInt('')).toEqual(E.left("'' is not a number!"));
    expect(safeParseInt('1.5')).toEqual(E.left("'1.5' is not an Integer!"));
    expect(safeParseInt('150')).toEqual(E.right(150));
  });
});
