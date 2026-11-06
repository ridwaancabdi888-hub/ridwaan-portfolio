// Pure contact-form rules, kept framework-free so they can be unit tested
// with `node --test` and shared by the Contact component.

export const CONTACT_FIELDS = ["name", "email", "phone", "subject", "message"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

export function validateField(field, rawValue) {
  const value = String(rawValue ?? "").trim();
  switch (field) {
    case "name":
      return value.length < 2 ? "Please enter your full name." : undefined;
    case "email":
      return !EMAIL_REGEX.test(value) ? "Please enter a valid email address." : undefined;
    case "phone":
      return value && !PHONE_REGEX.test(value) ? "Please enter a valid phone number." : undefined;
    case "subject":
      return value.length < 3 ? "Please enter a subject." : undefined;
    case "message":
      return value.length < 10 ? "Message should be at least 10 characters." : undefined;
    default:
      return undefined;
  }
}

export function validateContactForm(values) {
  const errors = {};
  for (const field of CONTACT_FIELDS) {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}

/** First invalid field in on-screen order, so focus can jump straight to it. */
export function getFirstInvalidField(errors) {
  return CONTACT_FIELDS.find((field) => Boolean(errors[field]));
}

/**
 * Called while the visitor edits a field that is already flagged: drop the
 * error as soon as the value becomes valid, keep it otherwise. Fields that
 * were never flagged are left alone so nobody is told off mid-typing.
 */
export function reconcileFieldError(errors, field, value) {
  if (!errors[field]) return errors;
  const message = validateField(field, value);
  if (message === errors[field]) return errors;
  const next = { ...errors };
  if (message) next[field] = message;
  else delete next[field];
  return next;
}
