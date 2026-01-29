[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.18403120-blue)](https://doi.org/10.5281/zenodo.18403120)
[![GitHub Pages](https://img.shields.io/badge/live-GitHub%20Pages-brightgreen)](https://helenopaiva.github.io/Preop/)
[![GitHub release](https://img.shields.io/github/v/release/HelenoPaiva/Preop)](https://github.com/HelenoPaiva/Preop/releases/tag/v1.0.0)
![Last commit](https://img.shields.io/github/last-commit/HelenoPaiva/Preop)
![License](https://img.shields.io/github/license/HelenoPaiva/Preop)

# Preoperative Evaluation

A lightweight, browser-based helper for **structured preoperative assessment and bilingual note generation**, designed for **anesthesiology practice**, teaching, and audit-friendly documentation.

**Live website:**  
https://helenopaiva.github.io/Preop/

---

## What it does

This Preoperative Evaluation tool provides a unified interface for creating a concise,
structured pre-op note, including:

- Basic patient data (name, age, sex)
- Anthropometric calculations:
  - BMI (kg/m²)
  - Ideal body weight (Devine formula), with inline explanation
- Surgical and ASA information:
  - Planned procedure
  - ASA physical status
- Quick visual summary:
  - BMI value and category
  - ASA class
  - Short risk comment based on BMI, ASA and age
- **Bilingual PT/EN pre-op summary** ready for copy-and-paste into the medical record

All calculations run **entirely client-side**, with no data storage or transmission.

---

## Why this exists

Preoperative documentation often alternates between free text and scattered calculations
done on the fly (BMI, IBW, ASA description), which can lead to:

- Inconsistent documentation between clinicians
- Omitted anthropometric or ASA details
- Increased cognitive load during a busy pre-op clinic or ward round

This tool was created to:

- Standardize a **minimal structured data set** for pre-op notes
- Reduce cognitive load while preserving flexibility for clinical nuances
- Facilitate reproducible documentation in both Portuguese and English
- Serve as a transparent **teaching and audit tool** for trainees

It is intended to **support**, not replace, clinical judgment.

---

## Design principles

- Static, dependency-light web application
- No backend, no cookies, no tracking
- Fully transparent, easily inspectable formulas
- Mobile-friendly and desktop-friendly layout
- Consistent visual language with related academic tools (e.g. BariCalc)

---

## Intended audience

- Anesthesiologists
- Anesthesia residents and fellows
- Perioperative physicians
- Medical educators
- Clinical researchers interested in structured perioperative data

---

## Limitations

- Calculations and risk comments are based on **simple, explicit rules** (BMI, ASA, age).
- The tool does **not** replace a full clinical risk assessment or guideline-based scoring.
- Outputs represent decision support and documentation aid, **not prescriptive medical advice**.

Users remain responsible for all clinical decisions and should always cross-check
with institutional protocols and current guidelines.

---

## License

This project is released under the **MIT License**.

---

## Author

**Heleno de Paiva Oliveira, MD, PhD**  
Professor of Anesthesiology  
Universidade Federal do Rio Grande do Norte (UFRN)
