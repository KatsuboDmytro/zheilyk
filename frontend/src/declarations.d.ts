declare module 'lodash.debounce' {
  const debounce: <F extends (...args: any) => any>(func: F, wait: number) => F;
  export default debounce;
}
