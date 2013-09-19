module.exports = {
  variable: 'cleanup',
  name: 'Delete created items',
  functions: {
    delete_bank: {
      module: 'bank_account',
      method: 'delete',
      uriOptions: ':bank.create.uri'
    },
    delete_card: {
      module: 'card',
      method: 'delete',
      uriOptions: ':cards.create.uri'
    },
    delete_customer: {
      module: 'customer',
      method: 'delete',
      uriOptions: ':customers.create.uri'
    }
  }
}