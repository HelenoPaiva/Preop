// js/validation.js

export function validateNumberInRange({
  rawValue,
  min,
  max,
  fieldLabel,
}) {
  const trimmed = typeof rawValue === "string" ? rawValue.trim().replace(",", ".") : String(rawValue ?? "").trim();

  if (trimmed === "") {
    return {
      value: NaN,
      error: "",
    };
  }

  const num = Number(trimmed);
  if (!Number.isFinite(num)) {
    return {
      value: NaN,
      error: `${fieldLabel}: invalid value / valor inválido.`,
    };
  }

  if (num < min || num > max) {
    return {
      value: num,
      error: `${fieldLabel}: expected between ${min} and ${max}. / esperado entre ${min} e ${max}.`,
    };
  }

  return { value: num, error: "" };
}

/**
 * Utility: show or hide error text in a given element.
 */
export function applyErrorToElement(el, errorText) {
  if (!el) return;
  if (errorText) {
    el.textContent = errorText;
    el.classList.remove("hidden");
  } else {
    el.textContent = "";
    el.classList.add("hidden");
  }
}

/**
 * Global validity check: returns true only if there is no error string.
 */
export function hasAnyError(...errors) {
  return errors.some((e) => typeof e === "string" && e.length > 0);
}
