/*============================ Storage Class ============================*/

//Handles saving and loading data from Local Storage
export default class Storage{
    // Load Data From Local Storage 
    static load(){
        
        //To access data
        const data = localStorage.getItem("transactions"); 

        //To parse JSON or return empty array
        return data ? JSON.parse(data) : [];
    }

    //Saving Transaction Array To Local Storage 
    static save(transactions){

        //Converting array into JSON and saving 
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
}
