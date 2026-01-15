/*====================================== UI Manager ======================================*/

//For updating DOM
export default class UIManager{
    constructor(){
        //Transaction history table
        this.transListEl = document.getElementById("trans-list");

        //Financial Summary elements
        this.totalIncomeEl = document.getElementById("total-income"); //Total Income
        this.totalExpenseEl = document.getElementById("total-expense"); //Total Expense
        this.netBalanceEl = document.getElementById("net-balance"); //Net Balance
            
        //Sub-Category dropdown
        this.subCategorySelect = document.getElementById("sub-category");

        //Sub-Category dropdown for the filters
        this.filterSubcategorySelect = document.getElementById("filter-subcategory");

        //Predefined sub-categories
        this.subCategories = {
            Income: ['Salary', 'Allowances', 'Bonus', 'Petty Cash', 'Other Income'],
            Expense: ['Rent', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Other Expense']
        }
    }

    //To render all transactions into table
    renderTransactions(transactions, editHandler, deleteHandler){

        //Clear old rows
        this.transListEl.innerHTML = "";

        transactions.forEach(transaction => {

            //To create a new row
            const row = document.createElement("tr");

            //To Determine sign and color
            let sign = transaction.category === "Income" ? "+" : "-";
            let color = transaction.category === "Income" ? "green" : "red";

            //To fill row 
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.category}</td>
                <td>${transaction.subCategory}</td>
                <td style="color:${color};">
                    ${sign}<i class="fa-solid fa-indian-rupee-sign"></i>${transaction.amount}</td>
                <td>${transaction.description}</td>
                <td>
                    <button class="edit-btn" data-id="${transaction.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete-btn" data-id="${transaction.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
                `;

                //To add row to table
                this.transListEl.appendChild(row);
        });

        //Adding event listener to edit button
        this.transListEl.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => editHandler(btn.getAttribute("data-id")));
        });

        //Adding event listener to delete button
        this.transListEl.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", () => deleteHandler(btn.getAttribute("data-id")));
        });
    }

    //To Update Financial Summary Section
    updateSummary(transactions){

        //Total Income
        const income = transactions
            .filter(t => t.category === "Income")
            .reduce((sum,t) => sum + t.amount,0);
        
        //Total Expense
        const expense = transactions
            .filter(t => t.category === "Expense")
            .reduce((sum, t) => sum + t.amount, 0);

        //Net Balance
        const balance = income - expense;

        //UI Updation
        this.totalIncomeEl.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${income.toFixed(2)}`;
        this.totalExpenseEl.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${expense.toFixed(2)}`;
        this.netBalanceEl.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${balance.toFixed(2)}`;
    }

    //To update the sub-category dropdown based on the selected category
    updatedSubCategories(category){
        this.subCategorySelect.innerHTML = `<option value="">Select a sub-category</option>`;

        if (category && this.subCategories[category]) {
            this.subCategories[category].forEach(sub =>{
                const option = document.createElement('option');
                option.value = sub;
                option.textContent = sub;
                this.subCategorySelect.appendChild(option);
            });
        }
    }

    //To update the sub-category dropdown based on the selected category for filter section
    updatedSubCategoriesForFilter(category, selectEl = this.subCategorySelect){
        const isFilter = selectEl === this.filterSubcategorySelect;
        const initialOption = isFilter ? `<option value="All">All</option>` : `<option value="">Select a sub-category</option>`;
        
        selectEl.innerHTML = initialOption;

        if (category && this.subCategories[category]){
            this.subCategories[category].forEach(sub => {
                const option = document.createElement("option");
                option.value =sub;
                option.textContent = sub;
                selectEl.appendChild(option);
            });
        }
    }
}
