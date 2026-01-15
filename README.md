# Money Manager App

A simple web-based **Money Manager** app to track your **income** and **expenses**. Users can **add, edit, delete**, and **filter transactions**, view **financial summaries**, visualize **Income vs Expense charts**, and **download transactions as CSV**.

---

## Features

- **Add, Edit & Delete Transactions**
- **Filter Transactions** by category, sub-category, and date range
- **Sort Transactions** by date or amount
- **Financial Summary** showing total income, total expense, and net balance
- **Income vs Expense Chart** using Chart.js
- **Download CSV** for transaction history
- **Form Validation** with inline error messages
- **Responsive Design** for desktop and mobile

---

## File Structure

**money-manager-app**
- index.html               # Main HTML file
- style.css                # Styling for app
- app.js                   # Main JS file
- transaction.js           # Transaction class
- transactionManager.js    # Transaction management (CRUD) logic
- UI.js                    # UI rendering logic
- filterAndSort.js         # Filter and Sort logic
- incomeVsExpense.js       # Chart.js logic
- downloadCSV.js           # CSV export logic
- form-validation.js       # Form validation logic
- storage.js               # Local storage handling
- README.md                # Project documentation

---

## How to Run

### Option 1: Open Directly
1. Download or clone the repository
2. Open `index.html` in any modern browser (Chrome recommended)

### Option 2: Using Live Server (Recommended)
1. Open the project folder in **VS Code**
2. Install the **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**
---

## Dependencies

- [Google Font](https://fonts.google.com/) for fonts
- [Font Awesome](https://cdnjs.com/libraries/font-awesome) for icons
- [Chart.js](https://www.chartjs.org/) for income vs expense chart

> No server is required — this is a fully **frontend-based app**.
---

## Author

**Nehal Mehta**  
GitHub: [https://github.com/nehal-mehta29](https://github.com/nehal-mehta29)