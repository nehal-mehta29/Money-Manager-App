/*============================ Transaction Class ============================*/

// Represents a single financial transaction
export default class Transaction{
    constructor(id,amount,date,category,subCategory,description){

        //Use provided Id or create unique ID for each transaction
        this.id = id; 

        //Ensure amount is stored as a number
        this.amount = parseFloat(amount); 

        //Date of transaction (YYYY-MM-DD)
        this.date = date; 

        //'Income' or 'Expense'
        this.category = category; 

        //Sub-category
        this.subCategory = subCategory; 

        //Additional details
        this.description = description; 
    }
}
