export function defineDescriptor<T>(value: T) {
  return {
    enumerable: true,
    writable: true,
    configurable: true,
    value,
  };
}
