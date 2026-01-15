/*======================================= Download CSV class =======================================*/

export default class CSVExport{

    //Static method to download transaction as CSV
    static downloadCSV(transactions){

        //Check if there is any data
        if(!transactions || transactions.length === 0){
            alert("No transactions available to export !!!");
            return;
        }

        //Header for downloaded CSV
        const headers =["Date", "Category", "Sub-Category", "Amount", "Description"];

        //Converting transactions into an array of values
        const rows = transactions.map(t => [
            t.date,
            t.category,
            t.subCategory,
            t.amount,
            `${t.description}`
        ]);

        //To build CSV string
        const csvContent = headers.join(",") + "\n" + rows.map(r => r.join(",")).join("\n");

        //Creating downloadable file
        const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
        const url =URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href",url);
        link.setAttribute("download", "transaction.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
