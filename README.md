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

1. **Download/Extract the ZIP file** to your local machine.
2. **Open `index.html`** in your preferred web browser (Chrome, Firefox, Edge, etc.).
3. **Start managing your finances!**
   - Click **Add Transaction** to add new income or expense.
   - Edit or delete transactions directly from the table.
   - Use filters and sorting options to view specific transactions.
   - Download transactions as **CSV** using the button in the header.
4. **Data is saved locally** in the browser's `LocalStorage`, so it persists between page refreshes.

---

## Dependencies

- [Google Font](https://fonts.google.com/) for fonts
- [Font Awesome](https://cdnjs.com/libraries/font-awesome) for icons
- [Chart.js](https://www.chartjs.org/) for income vs expense chart

> No server is required — this is a fully **frontend-based app**.



