const formValidator = (form, fieldsConfig, onValidateSuccess, onValidationError) => {

  const validateField = (fieldElement, fieldConfig) => {
    const value = fieldElement.value;
    const rules = fieldConfig.rules;
    const formGroup = fieldElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error-message');

    const fieldValidationResult = {name: fieldConfig.name, value: value, errors: []};
    rules.forEach(rule => {
      if (rule.required && !value) {
        fieldValidationResult.errors.push(rule.message);
      }
      if (rule.maxLength && `${value}`.length > rule.maxLength) {
        fieldValidationResult.errors.push(rule.message);
      }
    });

    if(fieldValidationResult.errors.length > 0){
      errorElement.innerText = fieldValidationResult.errors.join('\n');
    } else {
      errorElement.innerText = '';
    }
     console.log(fieldValidationResult);

    return fieldValidationResult;
  }

  const validateOnChange = () => {
    fieldsConfig.forEach((fieldConfig) => {
      const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
      fieldElement.addEventListener('input', e => {
        validateField(e.target, fieldConfig);
      });
    })
  }

  const validateOnSubmit = () => {
    const validatedFields = [];
    fieldsConfig.forEach((fieldConfig) => {
      const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
      validatedFields.push(validateField(fieldElement, fieldConfig));
    });

    return validatedFields;
  }

  const listenFormSubmit = () => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      console.log('submit');
      const errors = [];
      const validationResult = validateOnSubmit();
      validationResult.forEach(result => {
        errors.push(...result.errors);
      });
      if(errors.length === 0){
        onValidateSuccess(validationResult);
      }else {
        onValidationError(validationResult);
      }
      console.log(validationResult);
    });
  }
  listenFormSubmit();
  validateOnChange();
}

const fieldsConfig = [
  {
    name: 'first_name',
    rules: [
      {required: true, message: 'First name is required.'},
      {maxLength: 10, message: 'სიბოლოების რაოდენობა უნდა იყოს 10 ზე ნაკლები ან ტოლი'},
    ]
  },
  {
    name: 'last_name',
    rules: [
      {required: true, message: 'Last name is required.'},
    ]
  },
  {
    name: 'zip_code',
    rules: [
      {required: true, message: 'Zip Code name is required.'},
    ]
 
 },
  
 // damatebuli
  {
    name: 'mobile-number',
    rules: [
      {required: true, message: 'mobile number is required.'},
      {maxLength: 13, message: 'სიბოლოების რაოდენობა უნდა იყოს აღემატებოდეს 13-ს'},
    ]
  },
    {
    name: 'personal-number',
    rules: [
      {required: true, message: 'personal number is required.'},
      {maxLength: 11, message: 'სიბოლოების რაოდენობა უნდა იყოს აღემატებოდეს 13-ს'},
    ]
  }
    ]
  }
];


const form = document.querySelector('#user-registraion-form');

const onFormSubmitSuccess = (fields) => {
  console.log('We can send data to server', fields);
}
const onFormSubmitError = (fields) => {
  console.log('Error', fields);
}

formValidator(form, fieldsConfig, onFormSubmitSuccess, onFormSubmitError);
