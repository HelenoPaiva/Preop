// js/formulas.js

/**
 * Safely parses a numeric input (string or number).
 * Returns NaN if invalid.
 */
export function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const trimmed = value.trim().replace(",", ".");
    return trimmed === "" ? NaN : Number(trimmed);
  }
  return NaN;
}

/**
 * BMI = weight (kg) / [height (m)]^2
 */
export function calculateBMI(weightKg, heightCm) {
  const w = toNumber(weightKg);
  const hCm = toNumber(heightCm);
  if (!Number.isFinite(w) || !Number.isFinite(hCm) || w <= 0 || hCm <= 0) {
    return NaN;
  }
  const hM = hCm / 100;
  return w / (hM * hM);
}

/**
 * Devine formula for Ideal Body Weight (IBW).
 * - Men:   50 + 0.9 × (height cm − 152)
 * - Women: 45.5 + 0.9 × (height cm − 152)
 * sex: "M" | "F"
 */
export function calculateDevineIBW(heightCm, sex) {
  const hCm = toNumber(heightCm);
  if (!Number.isFinite(hCm) || hCm <= 0) return NaN;

  const delta = hCm - 152;
  if (sex === "M") {
    return 50 + 0.9 * delta;
  }
  if (sex === "F") {
    return 45.5 + 0.9 * delta;
  }
  return NaN;
}

/**
 * Rough BMI category string (EN+PT).
 */
export function describeBMICategory(bmi) {
  if (!Number.isFinite(bmi)) return "—";

  if (bmi < 18.5) return "Underweight / Baixo peso";
  if (bmi < 25) return "Normal / Eutrófico";
  if (bmi < 30) return "Overweight / Sobrepeso";
  if (bmi < 35) return "Obesity I / Obesidade I";
  if (bmi < 40) return "Obesity II / Obesidade II";
  return "Obesity III / Obesidade III";
}

/**
 * Simple comment string mixing ASA, BMI, age.
 * (Você pode refinar depois com regras mais elaboradas.)
 */
export function buildRiskComment({ asa, bmi, age }) {
  const parts = [];

  if (asa) {
    parts.push(`ASA ${asa}`);
  }

  if (Number.isFinite(bmi)) {
    if (bmi >= 40) {
      parts.push("morbid obesity / obesidade mórbida");
    } else if (bmi >= 35) {
      parts.push("high BMI / IMC elevado");
    }
  }

  if (Number.isFinite(age)) {
    if (age >= 70) parts.push("elderly / idoso");
    else if (age >= 60) parts.push("older adult / adulto mais velho");
  }

  if (!parts.length) return "No major modifiers flagged / Sem modificadores de risco evidentes.";
  return parts.join(" · ");
}

/**
 * Builds a bilingual textual pre-op summary based on structured fields.
 * This é o lugar para refinar o texto médico.
 */
export function buildPreOpSummary({
  name,
  age,
  sex,
  heightCm,
  weightKg,
  bmi,
  asa,
  surgeryType,
  notes,
}) {
  const safeName = name?.trim() || "Paciente";
  const ageStr = Number.isFinite(age) ? `${age} anos` : "idade não informada";
  const sexStr = sex === "M" ? "masculino" : sex === "F" ? "feminino" : "—";

  const bmiStr = Number.isFinite(bmi) ? bmi.toFixed(1) : "—";
  const asaStr = asa || "—";
  const surgeryStr = surgeryType?.trim() || "procedimento não especificado";

  const notesClean = notes?.trim();
  const notesPt = notesClean ? `Dados adicionais: ${notesClean}` : "Sem observações adicionais registradas.";
  const notesEn = notesClean ? `Additional notes: ${notesClean}` : "No additional notes recorded.";

  return [
    "PT:",
    `${safeName}, ${ageStr}, sexo ${sexStr}, planejado para ${surgeryStr}.`,
    `ASA ${asaStr}. IMC ${bmiStr} kg/m².`,
    notesPt,
    "",
    "EN:",
    `${safeName}, ${Number.isFinite(age) ? `${age}-year-old` : "age not informed"}, ${sex === "M" ? "male" : sex === "F" ? "female" : "sex not informed"}, scheduled for ${surgeryStr}.`,
    `ASA ${asaStr}. BMI ${bmiStr} kg/m².`,
    notesEn,
  ].join("\n");
}
