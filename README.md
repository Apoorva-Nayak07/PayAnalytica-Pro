# 📊 Employee Attendance & Salary Processing System

[![Live Demo](https://img.shields.io/badge/Demo-Live_Website-2563eb?style=for-the-badge&logo=netlify)](https://pay-analytics-pro.netlify.app/)

> A comprehensive solution featuring an **interactive web dashboard** and a **Python analytics script** designed to model employee records, calculate overtime and attendance percentages, flag compliance thresholds, and export reports.

---

## 🌐 Live Application

Click below to open and interact with the live dashboard deployed on Netlify:
👉 **[pay-analytics-pro.netlify.app](https://pay-analytics-pro.netlify.app/)**

---

## ✨ Features

- **Dynamic Data Modeling**: Work with structured employee objects (`ID`, `Name`, `Department`, `Days Present`, `Basic Salary`, `Overtime Hours`).
- **Real-Time Automated Calculations**:
  - **Attendance Percentage**: Calculated against a 26-day working baseline ($(\text{Days Present} / 26) \times 100$).
  - **Overtime Pay**: Calculated at 1.5× the base hourly rate (default rate: Rs. 250/hr).
  - **Final Salary**: Automated sum of Basic Salary + Overtime Pay.
- **Attendance Compliance Check**: Flags employees falling below the 75% attendance threshold (`OK` vs. `Below Threshold`).
- **Multi-Format Report Export**:
  - `.TXT` formatted summary report matching slide deck specifications.
  - `.CSV` structured data export for spreadsheet analysis.
- **Interactive UI**: Search, filter by threshold status, add new employee records, or delete existing records dynamically.

---

## 🛠️ Project Structure

```text
Day1 Assignment/
│
├── index.html            # Web Application Structure & Layout
├── styles.css            # Responsive UI & Dashboard Styling
├── script.js             # Interactive Frontend Logic & Data Exports
├── employee_analytics.py # Core Python Analytics & Report Generation Script
└── README.md             # Project Documentation
