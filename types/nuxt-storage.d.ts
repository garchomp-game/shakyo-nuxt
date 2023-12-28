declare module 'nuxt-storage' {
  export default class NuxtStorage {
    static localStorage: {
      getData(key: string): any;
      setData(key: string, value: any): void;
      removeItem(key: string): void;
    };
  }
}
