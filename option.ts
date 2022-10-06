import * as O from 'fp-ts/Option';
import { pipe, flow } from 'fp-ts/function';

interface Data {
  a?: {
    b?: {
      c: string;
    };
  };
}

const getCtheOldWay = (data: Data) => {
  const c = data?.a?.b?.c; // Beware - this is string | undefined only in strict mode;

  return c;
};

const getC = (data: Data) => O.fromNullable(data?.a?.b?.c);

/*
This doesn't realle make things much easier yet, but we're being more explicit with the return type. The true power of Option comes out when we use map and flatMap! But first let's have a look at pipes.
*/

const processC = (data: Data) => {
  const c = getCtheOldWay(data);
  if (c) {
    return c.toUpperCase();
  }
};

const mapOption =
  <T, R>(fn: (t: T) => R) =>
  (opt: O.Option<T>) => {
    if (O.isSome(opt)) {
      return O.some(fn(opt.value));
    }
    return O.none;
  };

const chainOption =
  <T, R>(fn: (t: T) => O.Option<R>) =>
  (opt: O.Option<T>) => {
    if (O.isSome(opt)) {
      return fn(opt.value);
    }

    return O.none;
  };

const processStringWithPipe = (str: string) =>
  pipe(
    str.replaceAll(' ', '-'),
    (s) => s.toUpperCase(),
    (result) => ({ result })
  );

const processStringWithFlow = flow(
  (str: string) => str.replaceAll(' ', '-'),
  (s) => s.toUpperCase(),
  (result) => ({ result })
);

/*
Now let's get the C value and process the string - enters "map"
*/

const processCOldWay = (data: Data) => {
  if (data?.a?.b?.c) {
    return processStringWithFlow(data?.a?.b?.c);
  }
};

const processCWithOption = flow(
  (data: Data) => O.fromNullable(data?.a?.b?.c),
  O.map(processStringWithFlow)
);

/*
Let's say that we would like to validate whether the result string is not longer than 10 characters
*/

export const processCWithValidationOldWay = (data: Data) => {
  if (data?.a?.b?.c) {
    const { result } = processStringWithFlow(data?.a?.b?.c);
    if (result.length <= 10) {
      return { result };
    }
  }
};

export const processCWithValidation = (data: Data) =>
  pipe(
    O.fromNullable(data?.a?.b?.c),
    O.map(processStringWithFlow),
    O.chain((value) =>
      O.fromPredicate(({ result }) => result.length <= 10)(value)
    )
  );
