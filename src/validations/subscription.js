import Validator from 'validator';
import isEmpty from './isEmpty';

const validateCreateSubscriptionInput = (input) => {
  const errors = {};
  const data = input;
  data.therapistUserId = !isEmpty(data.therapistUserId) ? data.therapistUserId : '';

  if (Validator.isEmpty(data.therapistUserId)) {
    errors.therapistUserId = 'Therapist user id field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateCreateSubscriptionInput };
