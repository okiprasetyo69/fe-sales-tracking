export const checkZeroValue = function (formGroup, field, errorData = null, toasterService = null, isFormBuilder = true) {
  let code;
  if (isFormBuilder) {
    code = formGroup.controls[field].value;
  } else {
    code = formGroup[field];
  }
  const reg = new RegExp('^\\d+$');
  let status = true;
  if (reg.test(code)) {
    if (code[0] == 0) {
      const messageZeroValue = 'Can\'t insert 0 value following by number.';
      if (toasterService != null) {
        toasterService.popAsync('error', 'Error Field', messageZeroValue);
      }
      if (errorData != null) {
        errorData[field] = messageZeroValue;
      }
      status = false;
    }
  }
  return status;
};

export const convertZeroValue = function (formGroup, field, errorData = null, toasterService = null) {
  let status;
  status = false;
  console.info('Check : ', formGroup.controls[field].value);
  console.info(formGroup.controls[field].value);
  const phone = formGroup.controls[field].value;
  const reg = new RegExp('^\\d+$');
  if (reg.test(phone)) {
    let dataOutput = '';
    if (phone[0] == 0) {
      if (phone.length > 1) {
        dataOutput = phone[0].toString().concat('-').concat(phone.substr(1));
      } else {
        dataOutput = phone[0].toString();
      }
    } else {
      dataOutput = phone;
    }
    let dataPatch;
    dataPatch = {};
    dataPatch[field] = dataOutput;
    formGroup.patchValue(dataPatch);
    status = true;
  } else {
    // const messageZeroValue = 'Can\'t contain charachter.';
    // if (toasterService != null) {
    //   toasterService.popAsync('error', 'Error Field', messageZeroValue);
    // }
    // if (errorData != null) {
    //   errorData[field] = messageZeroValue;
    // }
    status = true;
  }
  return status;
};

export const validationRequired = function (formGroup, field, fieldRequired) {
};

export const emailValidation = function (email) {

};

export const checkDuplicateInObject = function (propertyName, inputArray) {
  let seenDuplicate = false;
  const testObject = {};

  if (inputArray != null) {
    inputArray.map(function (item) {
      const itemPropertyName = item[propertyName];
      if (itemPropertyName in testObject) {
        // testObject[itemPropertyName].duplicate = true;
        // item.duplicate = true;
        seenDuplicate = true;
      } else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });
  }
  return seenDuplicate;
};

export const escape_me = function (val) {
  if (typeof (val) != 'string') return val;
  return val
    .replace(/[\\]/g, '\\\\')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t')
    .replace(/[\"]/g, '\\"')
    .replace(/\\'/g, '\\\'');
};

export const isDateExpires = function (date_plan) {
  // @ts-ignore
  const currentDate = new Date();
  // @ts-ignore
  const date_formated = new Date(date_plan);
  // @ts-ignore
  return new Date(date_formated.getFullYear(), date_formated.getMonth(), date_formated.getDate()) < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
};

export const isNoDataActivity = function (data_activity) {
  return Object.keys(data_activity).length == 0;
};

export const setUpperCase = function (name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
