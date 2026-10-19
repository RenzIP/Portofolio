---
title: "Hospital Management — Desktop App"
summary: "A C# WinForms application for hospital operations: role-based login, patients, staff, units, laboratories, and Excel export."
date: 2026-02-09
tags: ["C#", "WinForms", ".NET", "SQL"]
repo: "https://github.com/RenzIP/Hospital-Management-Desktop"
featured: true
status: "selesai"
cover: "../../../assets/projects/hospital-desktop.png"
---

## Background

An object-oriented programming course project: build a desktop application used
by more than one kind of user, with different permissions for each. This was the
first project that genuinely forced me to separate layers.

## What I built

- **Role-based login** (admin, staff, and other roles handled by `RoleHelper`),
  with menus restricted to the signed-in role.
- **Domain models** separated per entity: `Patient`, `Staff`, `Unit`,
  `Laboratory`, and `User`.
- **Data management** for patients, staff, units, and laboratories through
  add/edit forms.
- **Unit capital and inventory** records.
- **Excel report export** from inside the application (`ExcelHelper`).

## Structure

```
Controllers/   LoginController
Models/        Patient, Staff, Unit, Laboratory, User
Views/         one form per entity (WinForms Designer + code-behind)
Helpers/       DatabaseHelper, ExcelHelper, RoleHelper
```

Splitting `Controllers` / `Models` / `Views` / `Helpers` was not a style choice —
at the time it was the only way I could add a new entity without copying the
query code into every form.

## Honest note

This was written on .NET Framework with WinForms, so the interface follows the
built-in Windows controls. The work went into role logic and data management,
not into the UI.
