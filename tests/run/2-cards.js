module.exports = {
  variable: 'cards',
  name: 'Credit Card Calls',
  functions: {
    create: {
      module: 'card',
      method: 'create',
      data: {
        card_number: 5105105105105100,
        expiration_month: 12,
        expiration_year: 2020,
        security_code: 123
      }
    },
    list: {
      module: 'card',
      method: 'list'
    },
    id: {
      module: 'card',
      method: 'id',
      uriOptions: ':cards.create.uri'
    },
    update: {
      module: 'card',
      method: 'update',
      data: {
        meta: {
          my_custom_id: '12345'
        }
      },
      uriOptions: ':cards.create.uri'
    }
  }
}