import Transaction from "./transaction.js";
import UIManager from "./UI.js";
import { TransactionManager } from "./transactionManager.js";
import ValidationManager from "./form-validation.js";
import FilterAndSortManager from "./filterAndSort.js";
import IncomeVsExpenseChart from "./incomeVsExpense.js";
import CSVExport from "./downloadCSV.js";

/*============================ Main App ============================*/

class App{
    constructor(){

        //UI handler
        this.ui = new UIManager();

        //Transaction handler
        this.manager = new TransactionManager();

        //Validation handler
        this.validator = new ValidationManager();

        //Income vs Expense Chart handler
        this.incomeVsExpenseChart = new IncomeVsExpenseChart("balanceChart")

        //Form Elements
        this.transFormModal = document.getElementById("trans-form");
        this.transForm = document.getElementById("add-trans-form");
        this.modalTitleEl = document.querySelector("#add-content h2");
        this.closeBtn = document.getElementById("close-button");
        this.transIdInput = document.getElementById("trans-id");
        this.amountInput = document.getElementById("amount");
        this.dateInput = document.getElementById("date");
        this.categoryRadios = document.querySelectorAll("input[name='category']");
        this.subCategorySelect = document.getElementById("sub-category");
        this.descriptionInput = document.getElementById("description");
        this.submitBtn = document.getElementById("submit-btn");

        //Add Transaction Button
        this.addTransBtn = document.getElementById("add-trans");

        //Delete confirmation modal
        this.confirmationModal = document.getElementById("confirmation-modal");
        this.cancelDeleteBtn = document.getElementById("cancel-btn");
        this.confirmDeleteBtn = document.getElementById("delete-btn");

        //Filter and Sort elements
        this.filterCategoryEl = document.getElementById("filter-category");
        this.filterSubcategoryEl = document.getElementById("filter-subcategory");
        this.filterDateFromEl = document.getElementById("filter-date-from");
        this.filterDateToEl = document.getElementById("filter-date-to");
        this.clearFilterBtn = document.getElementById("clear-filter-btn");
        this.sortByEl = document.getElementById("sort-by");

        //Download CSV
        this.downloadCSVBtn = document.getElementById("download-CSV");
        this.downloadCSVBtn.addEventListener("click", () => {
            const transactions = this.manager.getAll();
            CSVExport.downloadCSV(transactions);
        })

        //To hold id while deleting
        this.deleteTransId = null;

        this.initialize();
    }

    //To Initialize App
    initialize(){
        this.addEventListeners();

        //To Load Existing data
        this.refreshUI();
    }

    //To Load the data from local storage when refreshed
    refreshUI(){

        //To get all transactions
        let transactions = this.manager.getAll();

        //Apply filters
        const category = this.filterCategoryEl.value;
        const subCategory = this.filterSubcategoryEl.value;
        const dateFrom = this.filterDateFromEl.value;
        const dateTo = this.filterDateToEl.value;

        const filteredTransactions = FilterAndSortManager.filterTransactions(transactions, category, subCategory, dateFrom, dateTo);

        //Apply sorting
        const sortBy = this.sortByEl.value;
        const sortedTransactions = FilterAndSortManager.sortTransaction(filteredTransactions, sortBy);

        //To render the filter and sort transactions
        this.ui.renderTransactions(sortedTransactions,

            //To get the ID of the transaction that is to edit and loading the pre filled form
            id => this.showForm(true, this.manager.getAll().find(t => t.id === id)),

            //To delete the data by id from the local storage
            id => {this.deleteTransId = id; this.confirmationModal.classList.remove("hidden"); }
        );
        this.ui.updateSummary(transactions);

        //To keep chart updated
        this.incomeVsExpenseChart.updateChart(transactions);
    }

    //To Show the form to add/edit transaction
    showForm(editMode = false,transaction = null){
            
        //To show the hidden form
        this.transFormModal.classList.remove("hidden");

        //To set modal title
        this.modalTitleEl.textContent = editMode ? "Edit Transaction" : "Add Transaction";

        //To set button title
        this.submitBtn.textContent = editMode ? "Save Changes" : "Add Transaction"

        //----------------- For editing form -----------------
        if (editMode && transaction){
            //Pre-filled form with transaction data
            this.transIdInput.value = transaction.id;
            this.dateInput.value = transaction.date;
            this.amountInput.value = transaction.amount;

            //Select correct category radio button
            this.categoryRadios.forEach(radio =>{
                radio.checked = (radio.value === transaction.category);
            });

            this.ui.updatedSubCategories(transaction.category);

            this.subCategorySelect.value = transaction.subCategory;
            this.descriptionInput.value = transaction.description;
        }

        //----------------- For Adding Transaction -----------------
        else{
            //Reset form for new transaction
            this.transForm.reset();
            this.transIdInput.value = "";
        }
    }

    //To hide the form 
    hideForm(){
        this.transFormModal.classList.add("hidden")
    }

    //Adding Event Listeners
    addEventListeners(){
        //To popup/display add form when add transaction button is clicked
        this.addTransBtn.addEventListener("click", () => this.showForm());

        //To close the form when the close button is clicked
        this.closeBtn.addEventListener("click", () => this.hideForm());

        //To Handle form submission (Add/Edit transactions)
        this.transForm.addEventListener("submit", (e) => {

            //To prevent refresh
            e.preventDefault();

            //Validate form
            if (!this.validator.validate(this.amountInput, this.dateInput, this.categoryRadios, this.subCategorySelect, this.descriptionInput)){
                return;
            }

            const id = this.transIdInput.value || Date.now().toString();
            const transaction = new Transaction(
                id,
                this.amountInput.value,
                this.dateInput.value,
                [...this.categoryRadios].find(r => r.checked)?.value || "Expense",
                this.subCategorySelect.value,
                this.descriptionInput.value
            );

            if (this.transIdInput.value){
                    
                //In case of editing the form
                this.manager.updateTransaction(transaction);
            }

            else{

                //In case of adding the transaction
                this.manager.addTransaction(transaction);
            }

            this.hideForm();

            //To update UI
            this.refreshUI();
        });

        //To confirm deletion
        this.confirmDeleteBtn.addEventListener("click",() => {
            this.manager.deleteTransaction(this.deleteTransId);
            this.confirmationModal.classList.add("hidden");
            this.refreshUI();
        });

        //To cancel deletion
        this.cancelDeleteBtn.addEventListener("click", () => {
            this.confirmationModal.classList.add("hidden");
        });

        //To handle category radio button change
        this.categoryRadios.forEach(radio => {
            radio.addEventListener("change", (e) => this.ui.updatedSubCategories(e.target.value));
        });

        //To handle Filters
        this.filterCategoryEl.addEventListener("change",() => { 
            this.ui.updatedSubCategoriesForFilter(this.filterCategoryEl.value, this.filterSubcategoryEl);
            this.refreshUI()
        });
        this.filterSubcategoryEl.addEventListener("change",() => this.refreshUI());
        this.filterDateFromEl.addEventListener("change",() => this.refreshUI());
        this.filterDateToEl.addEventListener("change",() => this.refreshUI());
        this.clearFilterBtn.addEventListener("click", () =>{
            this.filterCategoryEl.value = "All";
            this.filterSubcategoryEl.innerHTML = '<option value = "All">All</option>';
            this.filterDateFromEl.value = "";
            this.filterDateToEl.value = "";
            this.refreshUI();
        });

        //To handle Sorting
        this.sortByEl.addEventListener("change", () => this.refreshUI());
    }
}

/*============================ Initialize App ============================*/
new App();
