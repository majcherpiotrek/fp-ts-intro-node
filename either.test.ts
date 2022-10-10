import {
  safeParseFloat,
  safeParseInt,
  traverseAndCollectErrors,
} from './either';

import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as RA from 'fp-ts/ReadonlyArray';
import * as NonEmptyArray from 'fp-ts/NonEmptyArray';
import { pipe } from 'fp-ts/function';

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

  it('traverseArray', () => {
    const evenFilter = jest.fn(
      E.fromPredicate<number, number, string>(
        (n): n is number => n % 2 === 0,
        () => 'odd'
      )
    );

    const arr = [2, 4, 5, 6];

    const res = pipe(arr, E.traverseArray(evenFilter));

    expect(res).toEqual(E.left('odd'));
    expect(evenFilter).toHaveBeenCalledTimes(3);
    expect(evenFilter).toHaveBeenLastCalledWith(5);
  });

  it('traverseArray TE', async () => {
    const evenFilter = jest.fn(
      TE.fromPredicate<string, number, number>(
        (n): n is number => n % 2 === 0,
        () => 'odd'
      )
    );

    const arr = [2, 4, 5, 6];

    const res = await pipe(arr, TE.traverseArray(evenFilter))();

    expect(res).toEqual(E.left('odd'));
    expect(evenFilter).toHaveBeenCalledTimes(4);
    expect(evenFilter).toHaveBeenLastCalledWith(6);
  });

  it('traverseAndCollectErrors should fail on 3 and 5', async () => {
    const arr = [2, 3, 5, 6];

    const evenFilter = jest.fn(
      TE.fromPredicate<string, number, number>(
        (n): n is number => n % 2 === 0,
        (n) => `${n} is odd`
      )
    );

    const res = await traverseAndCollectErrors(evenFilter)(arr)();

    expect(res).toEqual(E.left(['3 is odd', '5 is odd']));
    expect(evenFilter).toHaveBeenCalledTimes(4);
    expect(evenFilter).toHaveBeenLastCalledWith(6);
  });

  it('traverseAndCollectErrors should succeed', async () => {
    const arr = [2, 4, 6, 8];

    const evenFilter = jest.fn(
      TE.fromPredicate<string, number, number>(
        (n): n is number => n % 2 === 0,
        (n) => `${n} is odd`
      )
    );

    const res = await traverseAndCollectErrors(evenFilter)(arr)();

    expect(res).toEqual(E.right([2, 4, 6, 8]));
    expect(evenFilter).toHaveBeenCalledTimes(4);
    expect(evenFilter).toHaveBeenLastCalledWith(8);
  });
});
