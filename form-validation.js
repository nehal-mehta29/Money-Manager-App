/*================================ Form Validation And Error Handling Class ================================*/

export default class ValidationManager{

    //To display inline error message
    showError(element, message){
        let errorContainer = element.closest(".form-field-container");

        if (!errorContainer){
            errorContainer = element;
        }
        //Check if the error message already exists or not
        let errorEl = errorContainer.querySelector(".error-message");

        if(!errorEl){

            //Create a new <div> element 
            errorEl = document.createElement("div");

            //Add a class for styling error message
            errorEl.classList.add("error-message");
            errorContainer.appendChild(errorEl);
        }
        //To set error message text
        errorEl.textContent = message;
    }

    //Clear all error message if the problem resolved
    clearErrors(){
        document.querySelectorAll(".error-message").forEach(el => el.remove());
    }

    //Form Validation
    validate(amountInput, dateInput, categoryRadios, subCategorySelect, descriptionInput){
        let isValid = true;

        this.clearErrors();

        //Validate Amount(Required)
        if(!amountInput.value.trim()){
            this.showError(amountInput, "Amount is required");
            isValid = false;
        }

        //Validate Amount (Must be greater than 0)
        else{
            const amount = parseFloat(amountInput.value);
            if (isNaN(amount) || amount <= 0){
                this.showError(amountInput, "Amount must be greater than 0.");
                isValid = false;
            }
        }

        //Validate Date (Required)
        if (!dateInput.value.trim()){
            this.showError(dateInput, "Date is required.");
            isValid = false;
        }
        else{

            //Validate Date (Must not be future date)
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0,0,0,0);  //Reset time for accurate comparison
            if (selectedDate > today){
                this.showError(dateInput, "Date cannot be in the future.");
                isValid = false;
            }
        }

        //Validate Category (Required)
        const isCategorySelected = [...categoryRadios].some(radio => radio.checked);
        if (!isCategorySelected){
            this.showError(document.getElementById("category-options"), "Category is required.");
            isValid = false;
        }

        //Validate Sub-Category (Required)
        if(!subCategorySelect.value){
            this.showError(subCategorySelect, "Sub-Category is required.");
            isValid = false;
        }

        //Validate Description (Less than 100 characters)
        if (descriptionInput.value.length > 100){
            this.showError(descriptionInput, "Description must be less than 100 characters");
            isValid = false;
        }

        return isValid;
    }
}
