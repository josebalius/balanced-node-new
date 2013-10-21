module.exports = {
  name: 'credits',
  methods: {
    create: {
      path: 'bank_accounts/:bank_account_id/credits',
      method: 'post',
      requires: [
        'amount'
      ]
    },
    create_with_bank: {
      path: 'credits',
      method: 'post'
    },
    id: {
      path: 'credits/:credit_id',
      method: 'get'
    },
    list: {
      path: 'credits',
      method: 'get'
    }
  }
}