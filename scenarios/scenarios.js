module.exports = {
  account_add_card: {
    module: 'account',
    method: 'add_card'
    data: {
      card_uri: "${payload['card_uri'] if payload else request['account']['card_uri']}"
    },
    urlOptions: {
      account_id: "${request['account']['id']}"
    }
  },
  account_capture_hold: {
    module: 'account',
    method: 'capture_hold',
    data: {
      amount: "${payload['amount'] if payload else request['amount'] or '1100'}",
      hold_uri: "${request.get('uri',  request.get('hold_uri', ''))}"
    },
    urlOptions: {
      account_id: "${request['account']['id']}"
    }
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
    }
    urlOptions: {
      account_id: "${request['account']['id']}"
    }
  },
  account_create_debit: {
    module: 'account',
    method: 'add_debit',
    data: {
      amount: "${payload['amount'] if payload else request['amount'] or '1100'}"
    },
    urlOptions: {
      account_id: "${request['account']['id']}"
    }
  },
  account_create_hold: {
    module: 'account',
    method: 'add_hold',
    data: {
      amount: "${payload['amount'] if payload else request['amount'] or '1100'}"
    },
    urlOptions: {
      account_id: "${request['account']['id']}"
    }
  },
  account_create_merchant: {
    module: 'account',
    method: 'add_bank',
    data: {
      card_uri: "${request['bank']['uri']}"
    }
    urlOptions: {
      account_id: "${request['account']['id']}"
    }
  },
  account_underwrite_business: {
    module: 'account',
    method: 'add_underwriter',
    data: {
      merchant: {}
    },
    urlOptions: {
      account_id: "${request['account']['id']}"
    }
  },
  account_underwrite_person: {
    module: 'account',
    method: 'add_underwriter',
    data: {
      merchant: {}
    },
    urlOptions: {
      account_id: "${request['account']['id']}"
    }
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
    urlOptions: {
      bank_account_id: "${request['bank']['id']}"
    }
  },
  bank_account_find_and_credit: {
    
  },
  bank_account_find_and_delete: {
    
  },
  bank_account_invalid_routing_number: {
    
  },
  bank_account_list: {
    
  },
  bank_account_show: {
    
  },
  bank_account_verification_create: {
    
  },
  bank_account_verification_show: {
    
  },
  bank_account_verification_update: {
    
  },
  callback_create: {
    
  },
  callback_delete: {
    
  },
  callback_list: {
    
  },
  callback_show: {
    
  },
  card_create: {
    
  },
  card_delete: {
    
  },
  card_invalidate: {
    
  },
  card_list: {
    
  },
  card_show: {
    
  },
  card_update: {
    
  },
  credit_account_list: {
    
  },
  credit_bank_account_list: {
    
  },
  credit_create_existing_bank_account: {
    
  },
  credit_create_new_bank_account: {
    
  },
  credit_customer_list: {
    
  },
  credit_failed_state: {
    
  },
  credit_list: {
    
  },
  credit_paid_state: {
    
  },
  credit_pending_state: {
    
  },
  credit_show: {
    
  },
  customer_add_bank_account: {
    
  },
  customer_add_card: {
    
  },
  customer_capture_hold: {
    
  },
  customer_create_debit: {
    
  },
  customer_create_hold: {
    
  },
  customer_credit: {
    
  },
  customer_delete: {
    
  },
  customer_underwrite: {
    
  },
  debit_account_list: {
    
  },
  debit_refund: {
    
  },
  debit_show: {
    
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