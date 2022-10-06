type LoadingState<T, E> =
  | {
      status: 'Loading';
    }
  | {
      status: 'Success';
      data: T;
    }
  | { status: 'Failed'; error: E };

interface LoadingStateNoADT<T, E> {
  status: 'Loading' | 'Success' | 'Failed';
  data?: T;
  error?: E;
}

/*
Without ADT we allow illegal states at the type level.
It requires implicit domain knowledge to know which states don't make sense. The validation must take place imperatively
*/

interface Data {
  secretNumber: number;
}

const handleLoadingStateNoADT = (state: LoadingStateNoADT<Data, Error>) => {
  if (state.status === 'Loading') {
    return 'Loading...';
  } else if (state.status === 'Success') {
    if (state.data) {
      return `Secret number is: ${state.data.secretNumber}`;
    } else {
      return 'This should never happen!!!';
    }
  } else {
    if (state.error) {
      return `Error was: ${state.error.message}`;
    } else {
      return 'This should never happen either!!!';
    }
  }
};

const handleLoadingState = (state: LoadingState<Data, Error>) => {
  if (state.status === 'Loading') {
    return 'Loading...';
  } else if (state.status === 'Success') {
    // Here we know that data is defined!
    return `Secret number is: ${state.data.secretNumber}`;
  } else {
    // Here we know the state is "Failed" and therefore "error" must be defined!
    return `Error was: ${state.error.message}`;
  }
};
