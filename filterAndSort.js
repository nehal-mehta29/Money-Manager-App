/*==================================== Filter and Sort Manager ====================================*/

//To handle filtering and sorting transactions
export default class FilterAndSortManager{

    //Filtering the transactions based on specified 
    static filterTransactions(transactions, category, subCategory, dateFrom, dateTo){
        return transactions.filter(transaction => {
            
            //Category filter
            const isCategoryMatch = category === "All" || transaction.category === category;

            //Sub-category filter
            const isSubCattegoryMatch = subCategory === "All" || transaction.subCategory === subCategory;

            //Date range filter
            const transactionDate = new Date(transaction.date);
            const isDateFromMatch = !dateFrom || transactionDate >= new Date(dateFrom);
            const isDateToMatch = !dateTo || transactionDate <= new Date(dateTo);

            return isCategoryMatch && isSubCattegoryMatch && isDateFromMatch && isDateToMatch;
        });
    }

    //Sort transaction based on a given key and order
    static sortTransaction(transactions, sortBy){
        const sortedTransactions = [...transactions];

        //Sort by date or amount
        sortedTransactions.sort((a,b) => {
            if (sortBy === "date-asc"){
                return new Date(a.date) - new Date(b.date);
            }

            if (sortBy === "date-desc"){
                return new Date(b.date) - new Date(a.date);
            }
            
            if (sortBy === "amount-asc") {
                return a.amount - b.amount;
            }

            if (sortBy === "amount-desc") {
                return b.amount - a.amount;
            }
            return 0;
        });
        return sortedTransactions;
    }
}
