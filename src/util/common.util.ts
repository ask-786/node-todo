export const tryCatch = async <T, E = Error>(
  promise: Promise<T>,
): Promise<[E, null] | [null, T]> => {
  try {
    return [null, await promise];
  } catch (e) {
    return [e as E, null];
  }
};
