import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  firstInvalidContactField,
  validateContactForm,
} from "../src/utils/contactForm.mjs";

const validValues = {
  name: "Ridwaan Mohamed",
  email: "ridwaan@example.com",
  phone: "+252 63 123 4567",
  subject: "Website project",
  message: "I would like to discuss a new website project.",
};

test("accepts a complete valid contact message", () => {
  assert.deepEqual(validateContactForm(validValues), {});
});

test("validates required fields and optional phone format", () => {
  const errors = validateContactForm({
    name: "R",
    email: "invalid",
    phone: "12",
    subject: "Hi",
    message: "Short",
  });

  assert.deepEqual(Object.keys(errors), ["name", "email", "phone", "subject", "message"]);
  assert.equal(firstInvalidContactField(errors), "name");
});

test("allows the optional phone field to remain empty", () => {
  assert.deepEqual(validateContactForm({ ...validValues, phone: "" }), {});
});

test("finds the first invalid field in visual form order", () => {
  assert.equal(firstInvalidContactField({ message: "Required", email: "Invalid" }), "email");
  assert.equal(firstInvalidContactField({}), null);
});

test("contact form focuses errors and exposes mobile autofill metadata", async () => {
  const source = await readFile(new URL("../src/components/Contact.tsx", import.meta.url), "utf8");

  assert.match(source, /requestAnimationFrame\(\(\) => document\.getElementById\(firstInvalidField\)\?\.focus\(\)\)/);
  assert.match(source, /autoComplete="name"/);
  assert.match(source, /autoComplete="email"/);
  assert.match(source, /autoComplete="tel"/);
  assert.equal((source.match(/\brequired\b/g) || []).length >= 4, true);
});
