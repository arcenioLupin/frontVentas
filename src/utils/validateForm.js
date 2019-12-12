import React from "react";

export function updateValidators(validators, fieldName, value) {
  let validator = validators[fieldName];
  validator.errors = [];
  validator.state = value;
  validator.valid = true;
  if (!validator.exclude) {
    validator.rules.forEach(rule => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          validator.errors.push(rule.message);
          validator.valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          validator.errors.push(rule.message);
          validator.valid = false;
        }
      }
    });
  }
}

export function resetValidators(validators) {
  Object.keys(validators).forEach(fieldName => {
    validators[fieldName].errors = [];
    validators[fieldName].state = "";
    validators[fieldName].valid = false;
    validators[fieldName].exclude = false;
  });
}

export function initializeValidators(validators, state, valid, exclude) {
  Object.keys(validators).forEach(fieldName => {
    validators[fieldName].errors = [];
    validators[fieldName].state = state[fieldName];
    validators[fieldName].valid = valid;
    validators[fieldName].exclude =
      typeof exclude.find(ex => ex === fieldName) !== "undefined";
  });
}

export function displayValidationErrors(validators, fieldName) {
  const validator = validators[fieldName];
  const result = "";
  if (validator) {
    const errors = validator.errors.map((info, index) => {
      return (
        <label
          className="error"
          style={{ display: !validator.valid ? "block" : "none" }}
          key={index}
        >
          * {info}
        </label>
      );
    });
    return errors;
  }
  return result;
}

export function isFormValid(validators) {
  let status = true;
  Object.keys(validators).forEach(fieldName => {
    updateValidators(validators, fieldName, validators[fieldName].state);
    if (!validators[fieldName].valid) {
      status = false;
    }
  });
  return status;
}
