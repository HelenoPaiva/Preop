// js/ui.js

import {
  calculateBMI,
  calculateDevineIBW,
  describeBMICategory,
  buildRiskComment,
  buildPreOpSummary,
  toNumber,
} from "./formulas.js";

import {
  validateNumberInRange,
  applyErrorToElement,
  hasAnyError,
} from "./validation.js";

/**
 * Toast helpers
 */
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast--error" : "toast--success"}`;

  const bullet = document.createElement("div");
  bullet.className = "mt-0.5 w-1.5 h-1.5 shrink-0 rounded-full";
  bullet.style.backgroundColor = type === "error" ? "#fb7185" : "#34d399";

  const text = document.createElement("div");
  text.textContent = message;

  toast.appendChild(bullet);
  toast.appendChild(text);
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-1");
    setTimeout(() => {
      toast.remove();
    }, 200);
  }, 2500);
}

/**
 * Sex toggle chips
 */
function setupSexToggle() {
  const buttons = Array.from(document.querySelectorAll(".sex-toggle"));
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("app-chip-active"));
      btn.classList.add("app-chip-active");
    });
  });
}

function getSelectedSex() {
  const active = document.querySelector(".sex-toggle.app-chip-active");
  return active?.dataset.sex || "";
}

/**
 * Reads all inputs, validates height/weight, updates the quick cards.
 */
function recalcAndUpdate() {
  const heightInput = document.getElementById("height-cm");
  const weightInput = document.getElementById("weight-kg");
  const ageInput = document.getElementById("patient-age");
  const asaSelect = document.getElementById("asa-class");
  const surgeryInput = document.getElementById("surgery-type");

  const heightErrorEl = document.getElementById("height-error");
  const weightErrorEl = document.getElementById("weight-error");

  const heightValidation = validateNumberInRange({
    rawValue: heightInput?.value ?? "",
    min: 100,
    max: 230,
    fieldLabel: "Height / Altura (cm)",
  });

  const weightValidation = validateNumberInRange({
    rawValue: weightInput?.value ?? "",
    min: 20,
    max: 300,
    fieldLabel: "Weight / Peso (kg)",
  });

  applyErrorToElement(heightErrorEl, heightValidation.error);
  applyErrorToElement(weightErrorEl, weightValidation.error);

  const anyError = hasAnyError(heightValidation.error, weightValidation.error);

  const sex = getSelectedSex();
  const age = toNumber(ageInput?.value);
  const asa = asaSelect?.value || "";
  const surgeryType = surgeryInput?.value || "";

  // BMI + Devine
  const bmi = calculateBMI(
    weightValidation.value,
    heightValidation.value
  );
  const ibwDevine = calculateDevineIBW(
    heightValidation.value,
    sex
  );

  // Write outputs
  const bmiDisplay = document.getElementById("bmi-display");
  const ibwDisplay = document.getElementById("ibw-devine-display");
  const summaryBmi = document.getElementById("summary-bmi");
  const summaryBmiTag = document.getElementById("summary-bmi-tag");
  const summaryAsa = document.getElementById("summary-asa");
  const summaryRisk = document.getElementById("summary-risk");

  if (bmiDisplay) {
    bmiDisplay.textContent =
      Number.isFinite(bmi) && !anyError ? `${bmi.toFixed(1)} kg/m²` : "—";
  }
  if (ibwDisplay) {
    ibwDisplay.textContent =
      Number.isFinite(ibwDevine) && !anyError
        ? `${ibwDevine.toFixed(1)} kg`
        : "—";
  }

  if (summaryBmi) {
    summaryBmi.textContent =
      Number.isFinite(bmi) && !anyError ? bmi.toFixed(1) : "—";
  }
  if (summaryBmiTag) {
    summaryBmiTag.textContent =
      Number.isFinite(bmi) && !anyError ? describeBMICategory(bmi) : "—";
  }
  if (summaryAsa) {
    summaryAsa.textContent = asa || "—";
  }

  if (summaryRisk) {
    const risk = buildRiskComment({ asa, bmi, age });
    summaryRisk.textContent = risk;
  }

  return {
    anyError,
    bmi,
  };
}

/**
 * Generate summary button
 */
function setupGenerateSummary() {
  const btn = document.getElementById("btn-generate-summary");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const nameInput = document.getElementById("patient-name");
    const ageInput = document.getElementById("patient-age");
    const heightInput = document.getElementById("height-cm");
    const weightInput = document.getElementById("weight-kg");
    const asaSelect = document.getElementById("asa-class");
    const surgeryInput = document.getElementById("surgery-type");
    const notesInput = document.getElementById("notes");

    const { anyError, bmi } = recalcAndUpdate();
    if (anyError) {
      showToast("Please fix invalid height/weight values first.", "error");
      return;
    }

    const age = toNumber(ageInput?.value);
    const heightCm = toNumber(heightInput?.value);
    const weightKg = toNumber(weightInput?.value);
    const sex = getSelectedSex();
    const asa = asaSelect?.value || "";
    const surgeryType = surgeryInput?.value || "";
    const notes = notesInput?.value || "";
    const name = nameInput?.value || "";

    const summaryText = buildPreOpSummary({
      name,
      age,
      sex,
      heightCm,
      weightKg,
      bmi,
      asa,
      surgeryType,
      notes,
    });

    const summaryArea = document.getElementById("summary-output");
    if (summaryArea) {
      summaryArea.value = summaryText;
      updateSummaryLength();
      showToast("Summary generated / Resumo gerado.");
    }
  });
}

/**
 * Copy summary to clipboard
 */
function setupCopySummary() {
  const btn = document.getElementById("btn-copy-summary");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const summaryArea = document.getElementById("summary-output");
    if (!summaryArea || !summaryArea.value.trim()) {
      showToast("No summary to copy / Nenhum resumo para copiar.", "error");
      return;
    }

    try {
      await navigator.clipboard.writeText(summaryArea.value);
      showToast("Copied to clipboard / Copiado para a área de transferência.");
    } catch {
      // Fallback: select text
      summaryArea.focus();
      summaryArea.select();
      showToast("Clipboard not available, text selected instead.", "error");
    }
  });
}

/**
 * Reset/clear button
 */
function setupResetButton() {
  const btn = document.getElementById("btn-reset");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const inputs = document.querySelectorAll(
      "#input-panel input, #input-panel textarea, #input-panel select"
    );
    inputs.forEach((el) => {
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.value = "";
      } else if (el instanceof HTMLSelectElement) {
        el.value = "";
      }
    });

    // Reset sex to default (M)
    const sexButtons = document.querySelectorAll(".sex-toggle");
    sexButtons.forEach((btn) => btn.classList.remove("app-chip-active"));
    const maleBtn = document.querySelector('.sex-toggle[data-sex="M"]');
    maleBtn?.classList.add("app-chip-active");

    const summaryArea = document.getElementById("summary-output");
    if (summaryArea) summaryArea.value = "";

    const summaryBmi = document.getElementById("summary-bmi");
    const summaryBmiTag = document.getElementById("summary-bmi-tag");
    const summaryAsa = document.getElementById("summary-asa");
    const summaryRisk = document.getElementById("summary-risk");

    if (summaryBmi) summaryBmi.textContent = "—";
    if (summaryBmiTag) summaryBmiTag.textContent = "—";
    if (summaryAsa) summaryAsa.textContent = "—";
    if (summaryRisk) summaryRisk.textContent = "—";

    const bmiDisplay = document.getElementById("bmi-display");
    const ibwDisplay = document.getElementById("ibw-devine-display");
    if (bmiDisplay) bmiDisplay.textContent = "—";
    if (ibwDisplay) ibwDisplay.textContent = "—";

    const heightErrorEl = document.getElementById("height-error");
    const weightErrorEl = document.getElementById("weight-error");
    applyErrorToElement(heightErrorEl, "");
    applyErrorToElement(weightErrorEl, "");

    updateSummaryLength();
    showToast("Form cleared / Formulário limpo.");
  });
}

/**
 * Live BMI/IBW preview on input changes.
 */
function setupLiveRecalc() {
  const ids = ["height-cm", "weight-kg", "patient-age", "asa-class", "surgery-type"];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      recalcAndUpdate();
    });
  });
}

/**
 * Keeps the "0 chars" indicator in sync.
 */
function updateSummaryLength() {
  const area = document.getElementById("summary-output");
  const counter = document.getElementById("summary-length");
  if (!area || !counter) return;
  counter.textContent = `${area.value.length} chars`;
}

function setupSummaryLengthWatcher() {
  const area = document.getElementById("summary-output");
  if (!area) return;
  area.addEventListener("input", updateSummaryLength);
  updateSummaryLength();
}

/**
 * Public init
 */
export function initApp() {
  setupSexToggle();
  setupGenerateSummary();
  setupCopySummary();
  setupResetButton();
  setupLiveRecalc();
  setupSummaryLengthWatcher();
  recalcAndUpdate(); // initial
}
