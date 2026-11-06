import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  getFirstInvalidField,
  reconcileFieldError,
  validateContactForm,
  validateField,
} from "../src/utils/contactForm.mjs";

const valid = {
  name: "Amina Yusuf",
  email: "amina@example.com",
  phone: "",
  subject: "Internship",
  message: "Hello, I would like to talk about a role.",
};

test("a complete message passes validation and phone stays optional", () => {
  assert.deepEqual(validateContactForm(valid), {});
  assert.equal(validateField("phone", "+252 63 123 4567"), undefined);
  assert.match(validateField("phone", "abc"), /valid phone/);
});

test("first invalid field follows on-screen order", () => {
  const errors = validateContactForm({ ...valid, email: "nope", message: "short" });
  assert.deepEqual(Object.keys(errors).sort(), ["email", "message"]);
  assert.equal(getFirstInvalidField(errors), "email");
  assert.equal(getFirstInvalidField({}), undefined);
});

test("a flagged error clears once the value becomes valid", () => {
  const errors = { email: "Please enter a valid email address.", name: "x" };
  const stillBad = reconcileFieldError(errors, "email", "amina@");
  assert.equal(stillBad, errors, "unchanged errors keep identity to avoid re-renders");
  const fixed = reconcileFieldError(errors, "email", "amina@example.com");
  assert.deepEqual(fixed, { name: "x" });
});

test("editing a field that was never flagged does not raise an error", () => {
  const errors = {};
  assert.equal(reconcileFieldError(errors, "message", "hi"), errors);
});

const source = await readFile(new URL("../src/components/Contact.tsx", import.meta.url), "utf8");

test("contact form focuses the first invalid field and supports autofill", () => {
  assert.match(source, /getFirstInvalidField\(validationErrors\)/);
  assert.match(source, /elements\.namedItem\(firstInvalid\)/);
  assert.match(source, /autoComplete="email"/);
  assert.match(source, /autoComplete="tel"/);
  assert.match(source, /\[\.light_&\]:text-red-700/, "error text keeps AA contrast in the light theme");
});
