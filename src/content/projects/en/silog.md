---
title: "Silog — Logistics System"
summary: "Warehouse and shipping management app with an object-oriented data model in Flutter/Dart."
date: 2026-09-16
tags: ["Flutter", "Dart", "OOP"]
repo: "https://github.com/RenzIP/silog-714240042"
featured: true
status: "aktif"
cover: "../../../assets/projects/silog.png"
---

## Background

A course project simulating a logistics flow: goods arriving at a warehouse,
stock management, and shipping orders to a destination city. It is built module
by module, so the interesting part is keeping the model sane as features pile up.

## What I built

- Domain models for `Barang` (item), `Gudang` (warehouse), `Pengiriman`
  (shipment), and `Pelanggan` (customer).
- **Encapsulation**: stock only changes through validated methods
  (`terimaBarang`, `keluarkanBarang`), never by direct assignment.
- **Immutability**: identifying attributes such as `kode` and `resi` are `final`.
- Shipment status transitions are validated so they cannot move backwards.
- A Flutter interface for viewing stock and creating shipments.

## Result

A class structure that is safe from unauthorised data changes, with clear error
messages when a business rule is violated.

## Note

This is the project that changed how I write code: if a business rule can be
broken from outside the class, that is not a UI bug — it is a model bug.
