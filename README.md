[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.xxxxxxxx-blue)](https://doi.org/10.5281/zenodo.xxxxxxxx)
[![GitHub Pages](https://img.shields.io/badge/live-GitHub%20Pages-brightgreen)](https://helenopaiva.github.io/Preop/)
[![GitHub release](https://img.shields.io/github/v/release/HelenoPaiva/<REPO_NAME>)](https://github.com/HelenoPaiva/Preop/releases/tag/v1.0.0)
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

## How to use the Preoperative Evaluation webpage

1. Open the live site:  
   https://helenopaiva.github.io/<REPO_NAME>/
2. Fill in:
   - Name, age, sex
   - Height (cm) and weight (kg)
   - ASA class and planned procedure
   - Relevant free-text notes (comorbidities, airway, anticoagulation, etc.)
3. Review:
   - Automatically calculated BMI and Devine ideal body weight
   - Quick risk snapshot (ASA + BMI category + brief comment)
4. Click **“Generate summary / Gerar resumo”**.
5. Review and adjust the generated **bilingual PT/EN summary**.
6. Click **“Copy to clipboard / Copiar”** and paste into the EMR or pre-op form.

The interface validates input ranges (e.g. implausible height or weight) and flags
potential typos with user-friendly messages.

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

## Author

Developed and maintained by  
**Heleno de Paiva Oliveira, MD, PhD**  
Professor of Anesthesiology  
Universidade Federal do Rio Grande do Norte (UFRN)

---

## License

This project is released under the **MIT License**.

See the [`LICENSE`](LICENSE) file for details.

---

## How to adapt for local use

If you fork or adapt this project, you are encouraged to:

- Adjust text templates to match local language and institutional style.
- Extend the tool with additional structured fields (e.g. STOP-BANG, RCRI, ARISCAT).
- Document any new formulas clearly in the code and/or README.

Please update the DOI, live URL and repository name (`<REPO_NAME>`) as appropriate
for your deployment.
