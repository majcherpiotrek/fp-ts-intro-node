import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/ReadonlyArray';
/* Option is great for dealing with nullable values, but it might not be enough when we want to store the information about the error - in other words, know what went wrong inside a chain of optional operations. In this situation Either comes to the rescue! */

type Integer = number & { _tag: 'Integer' };

export const safeParseFloat = (str: string): E.Either<string, number> => pipe();

const isInt = (n: number): n is Integer => n - Math.floor(n) === 0;
const isString = (s: unknown): s is string => typeof s === 'string';

export const safeParseInt = (n: unknown): E.Either<string, Integer> => pipe();

const pow2 = (n: Integer): Integer => (n * n) as Integer;

interface OperationError {
  error: string;
}

// Now let's see how mapping Eithers work
export const powList = (list: readonly unknown[]) => pipe();

// The problem here is that we get a list of eithers as a result, which is difficult to work with - we would like to get an error if any of the list elements fails

// Here comes traverseArray

export const powListTraverse = (list: readonly unknown[]) => pipe();
