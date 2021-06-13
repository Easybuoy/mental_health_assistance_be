import Validator from 'validator';
import isEmpty from './isEmpty';

const validateCreatePaymentInput = (input) => {
  const errors = {};
  const data = input;
  data.trxref = !isEmpty(data.trxref) ? data.trxref : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.transaction = !isEmpty(data.transaction) ? data.transaction : '';
  data.amount = !isEmpty(data.amount) ? data.amount : '';

  if (Validator.isEmpty(data.trxref)) {
    errors.trxref = 'trxref field is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'status field is required';
  }

  if (Validator.isEmpty(data.transaction)) {
    errors.transaction = 'transaction field is required';
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'amount field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateCreatePaymentInput };
