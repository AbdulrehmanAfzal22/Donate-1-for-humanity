"use client";

import { useCallback, useMemo, useState } from "react";

/**
 * Blur-based validation helper.
 * - No validation shown while typing.
 * - When user leaves a field (onBlur), validate that field and show error.
 * - On submit, validates all fields.
 */
export default function useBlurValidation({ initialValues, validators }) {
  const [values, setValues] = useState(initialValues || {});
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = useCallback(
    (name, value) => {
      const fn = validators?.[name];
      return fn ? fn(value, values) : "";
    },
    [validators, values]
  );

  const setValue = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Do NOT validate on change. Only clear error if user edits after it was shown.
    setErrors((e) => (e?.[name] ? { ...e, [name]: "" } : e));
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValue(name, value);
    },
    [setValue]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((t) => ({ ...t, [name]: true }));
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    },
    [validateField]
  );

  const validateAll = useCallback(() => {
    const nextErrors = {};
    Object.keys(validators || {}).forEach((name) => {
      const err = validators[name]?.(values[name], values);
      if (err) nextErrors[name] = err;
    });
    setErrors(nextErrors);
    // mark all as touched so UI can show them
    const nextTouched = {};
    Object.keys(validators || {}).forEach((name) => (nextTouched[name] = true));
    setTouched(nextTouched);
    return nextErrors;
  }, [validators, values]);

  const getFieldProps = useCallback(
    (name) => ({
      name,
      value: values[name] ?? "",
      onChange: handleChange,
      onBlur: handleBlur,
    }),
    [values, handleChange, handleBlur]
  );

  const visibleErrors = useMemo(() => {
    const v = {};
    Object.keys(errors || {}).forEach((k) => {
      if (touched?.[k] && errors[k]) v[k] = errors[k];
    });
    return v;
  }, [errors, touched]);

  return {
    values,
    setValues,
    touched,
    errors,
    visibleErrors,
    setValue,
    getFieldProps,
    handleChange,
    handleBlur,
    validateAll,
  };
}
