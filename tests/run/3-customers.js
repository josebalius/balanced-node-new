module.exports = {
  variable: 'customers',
  name: 'Customer Calls',
  functions: {
    create: {
      module: 'customer',
      method: 'create',
      data: {
        name: 'Joe M Bob'
      }
    },
    list: {
      module: 'customer',
      method: 'list',
      data: {
        name: 'John'
      }
    },
    id: {
      module: 'customer',
      method: 'id',
      uriOptions: ':customers.create.uri'
    },
    add_card: {
      module: 'customer',
      method: 'add_card',
      data: {
        card_uri: ':cards.create.uri'
      },
      uriOptions: ':customers.create.uri'
    },
    add_bank: {
      module: 'customer',
      method: 'add_bank',
      data: {
        bank_account_uri: ':bank.create.uri'
      },
      uriOptions: ':customers.create.uri'
    },
    verify_bank: {
      module: 'bank_account',
      method: 'init_bank_account_verification',
      uriOptions: ':bank.create.verifications_uri'
    },
    confirm_bank_account: {
      module: 'bank_account',
      method: 'confirm_bank_account_verification',
      data: {
        amount_1: 1,
        amount_2: 1
      },
      uriOptions: ':customers.verify_bank.uri'
    }
  }
}