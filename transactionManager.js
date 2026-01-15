import Storage from "./storage.js";

/*============================ Transaction Manager ============================*/

//Handles add, edit and delete

export class TransactionManager{
    constructor(){

        //Load Transaction from the storage
        this.transactions = Storage.load();
    }

    //To add a new transaction
    addTransaction(transaction){

        //To add to array
        this.transactions.push(transaction);

        //Saving the newly added transaction in local storage
        Storage.save(this.transactions);
    }

    //Updating the existing transaction (when edit button is clicked)
    updateTransaction(updatedTransaction){
        this.transactions = this.transactions.map(t =>
            t.id === updatedTransaction.id ? updatedTransaction : t
        );

        //To save changes in the local storage
        Storage.save(this.transactions);
    }

    //To delete a transaction (when delete button is clicked)
    deleteTransaction(id){

        //To Delete the transaction
        this.transactions = this.transactions.filter(t => t.id !==id);

        //To save update the data in local storage
        Storage.save(this.transactions);
    }

    //To return all the transaction
    getAll(){
        return this.transactions;
    }
}
