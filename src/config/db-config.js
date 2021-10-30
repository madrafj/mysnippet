export const DBConfig = {
  name: 'NpmDB',
  version: 2,
  objectStoresMeta: [
    {
      store: 'package',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: true } },
        { name: 'content', keypath: 'content', options: { unique: false } }
      ]
    }
  ]
}