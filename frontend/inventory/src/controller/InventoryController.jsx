import axios from "axios";

const baseURL= "http://localhost:12345/inventory";

const createInventory= async (item_name,price,inHandQuantity,soldQuantity,date)=>{
    try{
const json_body= {
    item_name: item_name,
    price: price,
    inHandQuantity: inHandQuantity,
    soldQuantity: soldQuantity,
    date: date,
}
const response= await axios.post(baseURL,json_body)
return response.data;
    }
    catch(error){
alert("Error...");
    }
};
const findInventory= async()=>{
    try{
        const response= await axios.get(baseURL+"/getall");
        return response.data;
    }
    catch(error){
        alert("Error");
    }
};
const deleteInventory= async(deleteId)=>{
    try{
        const response= await axios.delete(baseURL+"/"+deleteId);
        console.log(response);
        return response.date;
    }
    catch(error){}
};
const getoneInventory= async(Id)=>{
    try{
       const response= await axios.get(baseURL+"/"+Id);
       return response.data; 
    }
    catch(error){}
};

export {createInventory,findInventory,deleteInventory,getoneInventory};