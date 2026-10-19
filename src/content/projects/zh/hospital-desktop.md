---
title: "Hospital Management —— 桌面应用"
summary: "用 C# WinForms 做的医院业务应用：按角色登录、患者／员工／科室／化验管理，以及 Excel 导出。"
date: 2026-02-09
tags: ["C#", "WinForms", ".NET", "SQL"]
repo: "https://github.com/RenzIP/Hospital-Management-Desktop"
featured: true
status: "selesai"
cover: "../../../assets/projects/hospital-desktop.png"
---

## 背景

面向对象编程的课程作业：做一个有多种用户、权限各不相同的桌面应用。
这是第一个真正逼着我分层写的项目。

## 做了什么

- **按角色登录**（管理员、员工等，由 `RoleHelper` 管理），
  菜单根据登录角色限制。
- 每个实体单独的 **领域模型**：`Patient`、`Staff`、`Unit`、`Laboratory`、`User`。
- 患者、员工、科室、化验的 **数据管理**（新增／编辑表单）。
- 科室的 **资金与库存**记录。
- 在应用内 **导出 Excel 报表**（`ExcelHelper`）。

## 结构

```
Controllers/   LoginController
Models/        Patient, Staff, Unit, Laboratory, User
Views/         每个实体一个表单（WinForms Designer + code-behind）
Helpers/       DatabaseHelper, ExcelHelper, RoleHelper
```

`Controllers` / `Models` / `Views` / `Helpers` 的拆分不是审美选择 ——
当时这是唯一能让我新增实体时不必把查询代码复制到每个表单里的办法。

## 说实话

这个项目用的是 .NET Framework 和 WinForms，所以界面跟随 Windows 原生控件。
我花力气的地方是权限逻辑和数据管理，不是界面。
