module.exports = {
  variable: 'events',
  name: 'Events Calls',
  functions: {
    list: {
      module: 'events',
      method: 'list'
    },
    id: {
      module: 'events',
      method: 'id',
      uriOptions: ':events.list.items.0.uri'
    }
  }
}