module.exports = {
  account_add_card: {
    module: 'account',
    method: 'add_card'
    data: {
      card_uri: "${payload['card_uri'] if payload else request['account']['card_uri']}"
    },
    uriOptions: "${request['uri']}"
  },
  account_capture_hold: {
    module: 'account',
    method: 'capture_hold',
    data: {
      amount: "${payload['amount'] if payload else request['amount'] or '1100'}",
      hold_uri: "${request.get('uri',  request.get('hold_uri', ''))}"
    },
    uriOptions: "${request['uri']}"
  },
  account_create: {
    module: 'account',
    method: 'create'
  },
  account_create_buyer: {
    module: 'account',
    method: 'add_card',
    data: {
      card_uri: "${request['card']['uri']}"
    },
    uriOptions: "${request['uri']}"
  },
  account_create_debit: {
    module: 'account',
    method: 'add_debit',
    data: {
      amount: "${payload['amount'] if payload else request['amount'] or '1100'}"
    },
    uriOptions: "${request['uri']}"
  },
  account_create_hold: {
    module: 'account',
    method: 'add_hold',
    data: {
      amount: "${payload['amount'] if payload else request['amount'] or '1100'}"
    },
    uriOptions: "${request['uri']}"
  },
  account_create_merchant: {
    module: 'account',
    method: 'add_bank',
    data: {
      card_uri: "${request['bank']['uri']}"
    }
    uriOptions: "${request['uri']}"
  },
  account_underwrite_business: {
    module: 'account',
    method: 'add_underwriter',
    data: {
      merchant: {}
    },
    uriOptions: "${request['uri']}"
  },
  account_underwrite_person: {
    module: 'account',
    method: 'add_underwriter',
    data: {
      merchant: {}
    },
    uriOptions: "${request['uri']}"
  },
  bank_account_create: {
    module: 'bank',
    method: 'create',
    data: {
      name: "${payload['name'] if payload else request['bank_account']['name']}",
      account_number: "${payload['account_number'] if payload else request['bank_account']['account_number']}",
      routing_number: "${payload['routing_number'] if payload else request['bank_account']['routing_number']}",
      type: "checking"
    }
  },
  bank_account_delete: {
    module: 'bank',
    method: 'delete',
    uriOptions: "${request['uri']}"
  },
  bank_account_find_and_credit: [
    {
      module: 'bank',
      method: 'id',
      uriOptions: "${request['uri']}"
    },
    {
      module: 'bank',
      method: 'add_credit',
      uriOptions: "result.uri",
      data: {
        amount: "${payload['amount'] if payload else request['amount'] or '1100'}"
      }
    }
  ],
  bank_account_find_and_delete: [
    {
      module: 'bank',
      method: 'id',
      uriOptions: "${request['uri']}" 
    },
    {
      module: 'bank',
      method: 'delete',
      uriOptions: "result.uri"
    }
  ],
  bank_account_invalid_routing_number: {
    module: 'bank',
    method: 'create',
    data: {
      name: "${payload['name'] if payload else request['bank_account']['name']}",
      account_number: "${payload['account_number'] if payload else request['bank_account']['account_number']}",
      routing_number: "0000000000",
      type: "checking"
    }
  },
  bank_account_list: {
    module: 'bank',
    method: 'list',
    data: {
      limit: 10,
      offset: 0
    }
  },
  bank_account_show: {
    module: 'bank',
    method: 'id',
    uriOptions: "${request['uri']}"
  },
  bank_account_verification_create: [
    {
      module: 'bank',
      method: 'id',
      uriOptions: "${request['uri']}" 
    },
    {
      module: 'bank',
      method: 'init_bank_account_verification',
      uriOptions: "result.verifications_uri" 
    }
  ],
  bank_account_verification_show: [
    {
      module: 'bank',
      method: 'id',
      uriOptions: "${request['uri']}" 
    },
    {
      module: 'bank',
      method: 'list_bank_account_verifications',
      uriOptions: "result.verifications_uri" 
    }
  ],
  bank_account_verification_update: 
    {
      module: 'bank',
      method: 'id',
      uriOptions: "${request['uri']}" 
    },
    {
      module: 'bank',
      method: 'confirm_bank_account_verifications',
      data: {
        amount_1: 1,
        amount_2: 1
      }
      uriOptions: "result.verifications_uri" 
    }
  ],
  callback_create: {
    module: 'callbacks',
    method: 'create',
    data: {
      uri: 'http://mywebsite.com/callack_uri'
    }
  },
  callback_delete: {
    module: 'callbacks',
    method: 'delete',
    uriOptions: "${request['uri']}" 
  },
  callback_list: {
    module: 'callbacks',
    method: 'list'
  },
  callback_show: {
    module: 'callbacks',
    method: 'id',
    uriOptions: "${request['uri']}" 
  },
  card_create: {
    module: 'card',
    method: 'create',
    data: {
      card_number: "${payload['card_number']}",
      expiration_year: "${payload['expiration_year']}",
      expiration_month: "${payload['expiration_month']}",
      security_code: ""
    }
  },
  card_delete: {
    module: 'card',
    method: 'delete',
    uriOptions: "${request.get('uri', request.get('debits_uri',''))}" 
  },
  card_invalidate: {
    module: 'card',
    method: 'delete',
    uriOptions: "${request.get('uri', request.get('debits_uri',''))}" 
  },
  card_list: {
    module: 'card',
    method: 'list'
  },
  card_show: {
    module: 'card',
    method: 'id',
    uriOptions: "${request.get('uri', request.get('debits_uri',''))}" 
  },
  card_update: {
    module: 'card',
    method: 'update',
    data: {
      twitter: "123456789"
    },
    uriOptions: "${request.get('uri', request.get('debits_uri',''))}" 
  },
  credit_account_list: {
    
  },
  credit_bank_account_list: [
    {
      module: 'bank',
      method: 'id',
      uriOptions: "${request['uri']}"
    },
    {
      module: 'bank',
      method: 'list_credits',
      uriOptions: 'result.credits_uri'
    }
  ],
  credit_create_existing_bank_account: {
    module: 'credits',
    method: 'create',
    data: {
      amount: "${payload['amount'] if payload else request['amount'] or '1100'}"
    },
    uriOptions: "${request['uri']}"
  },
  credit_create_new_bank_account: {
    module: 'credits',
    method: 'create_with_bank',
    data: "${to_json( request ) | n }"
  },
  credit_customer_list: {
    module: 'customer',
    method: 'list_credits'
  },
  credit_failed_state: {
    module: 'credits',
    method: 'create_with_bank',
    data: {
      amount: "${payload['amount'] if payload else request['payload']['amount'] or '1100'}",
      bank_account: {
        name: "${payload['bank_account']['name'] if payload else request['payload']['bank_account']['name']}",
        account_number: "${payload['bank_account']['account_number'] if payload else request['payload']['bank_account']['account_number']}",
        routing_number: "${payload['bank_account']['routing_number'] if payload else request['payload']['bank_account']['routing_number']}",
        type: "checking"
      }
    }
  },
  credit_list: {
    module: 'credits',
    method: 'list',
    data: {
      limit: 10,
      offset: 0
    }
  },
  credit_paid_state: {
    module: 'credits',
    method: 'create_with_bank',
    data: {
      bank_account: {
      	name: "${payload['bank_account']['name'] if payload else request['payload']['bank_account']['name']}",
      	account_number: "${payload['bank_account']['account_number'] if payload else request['payload']['bank_account']['account_number']}",
      	routing_number: "${payload['bank_account']['routing_number'] if payload else request['payload']['bank_account']['routing_number']}"
      	type: "Checking"
      },
      amount: "${payload['amount'] if payload else request['payload']['amount'] or '1100'}"
    }
  },
  credit_pending_state: {
    module: 'credits',
    method: 'create_with_bank',
    data: {
      amount: "${payload['amount'] if payload else request['payload']['amount'] or '1100'}",
      bank_account: {
      	name: "${payload['bank_account']['name'] if payload else request['payload']['bank_account']['name']}",
      	account_number: "${payload['bank_account']['account_number'] if payload else request['payload']['bank_account']['account_number']}",
      	routing_number: "${payload['bank_account']['routing_number'] if payload else request['payload']['bank_account']['routing_number']}",
      	type: "checking"
      }
    }
  },
  credit_show: {
    module: 'credits',
    method: 'id',
    uriOptions: "${request['uri']}"
  },
  customer_add_bank_account: {
    module: 'customer',
    method: 'add_bank',
    data: {
      bank_account_uri: "${request.get('payload').get('bank_account_uri')}"
    },
    uriOptions: "${request['uri']}"
  },
  customer_add_card: {
    module: 'customer',
    method: 'add_card',
    data: {
      card_uri: "${request.get('payload').get('card_uri')}"
    },
    uriOptions: "${request['uri']}"
  },
  customer_capture_hold: {
    module: 'hold',
    method: 'capture',
    data: {
      amount: "${payload['amount'] if payload else request['amount'] or '1100'}"
    }
    uriOptions: "${request.get('uri',  request.get('hold_uri', ''))}"
  },
  customer_create: {
    module: 'customer',
    method: 'create',
    data: {
      name: "William Henry Cavendish III",
      email: "whc@example.org",
      meta: {
  	    "customKey.first": "first",
  	    "customKey.second": "second"
      },
      ssn_last4: "1234",
      business_name: "Cavendish LLC",
      address: {
  	    line1: "123 Main St",
  	    line2: "Apt. 1",
  	    city: "San Francisco",
  	    state: "CA",
  	    postal_code: "94133",
  	    country_code: "USA"
      },
      phone: "+19994445555",
      dob: "1984-01",
      ein: "451111111"
    }
  },
  customer_create_debit: [
    {
      module: 'customer',
      method: 'id',
      uriOptions: "${request['uri']}"
    },
    {
      module: 'customer',
      method: 'add_debit',
      data: {
        amount: "${request.get('payload').get('amount')}",
        appears_on_statement_as: "${request.get('payload').get('appears_on_statement_as')}"
        description: "${request.get('payload').get('description')}"
      },
      uriOptions: 'result.debits_uri'
    }
  ],
  customer_create_hold: [
    {
      module: 'customer',
      method: 'id',
      uriOptions: "${request['uri']}"
    },
    {
      module: 'customer',
      method: 'add_hold',
      data: { 
        amount: "${payload['amount'] if payload else request['amount'] or '1100'}" 
      },
      uriOptions: 'result.debits_uri'
    }
  ],
  customer_credit: [
    {
      module: 'customer',
      method: 'id',
      uriOptions: "${request['uri']}"
    },
    {
      module: 'customer',
      method: 'add_credit',
      data: { 
        amount: "${payload['amount'] if payload else request['amount'] or '1100'}" 
      },
      uriOptions: 'result.credits_uri'
    }
  ],
  customer_delete: {
    module: 'customer',
    method: 'delete',
    uriOptions: "${request['uri']}"
  },
  customer_underwrite: {
    module: 'customer',
    method: 'update',
    data: {
      name: "${payload['name'] if payload else request['bank_account']['name']}"
    },
    uriOptions: "${request['uri']}"
  },
  debit_account_list: {
    
  },
  debit_create: {
    
  },
  debit_customer_list: {
    
  },
  debit_list: {
    
  },
  debit_refund: {
    module: 'debits',
    method: 'refund',
    uriOptions: "${request['debit_uri']}"
  },
  debit_show: {
    module: 'debits',
    method: 'id',
    uriOptions: 
  },
  debit_update: {
    
  },
  event_list: {
    
  },
  event_replay: {
    
  },
  event_show: {
    
  },
  hold_account_list: {
    
  },
  hold_capture: {
    
  },
  hold_create: {
    
  },
  hold_customer_list: {
    
  },
  hold_list: {
    
  },
  hold_show: {
    
  },
  hold_update: {
    
  },
  hold_void: {
    
  },
  refund_account_list: {
    
  },
  refund_create: {
    
  },
  refund_customer_list: {
    
  },
  refund_list: {
    
  },
  refund_show: {
    
  },
  refund_update: {
    
  },
  reversals_create: {
    
  },
  reversals_list: {
    
  },
  reversals_show: {
    
  },
  reversals_update: {
    
  }
};