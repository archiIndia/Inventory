import { useState, useEffect } from "react";
import {
  createInventory,
  findInventory,
  deleteInventory,
  getoneInventory,
} from "./controller/InventoryController";
import {
  Loader2,
  Loader2Icon,
  Trash2Icon,
  ArrowLeftSquare,
} from "lucide-react";
import moment from "moment";

function Inventory() {
  const [item_name, setItem_name] = useState();
  const [price, setPrice] = useState();
  const [inHandQuantity, setInHandQuantity] = useState();
  const [soldQuantity, setSoldQuantity] = useState();
  const [date, setDate] = useState();
  const [fId, setFId] = useState();
  const [inventory, setInventory] = useState([]);
  const [isperformingAnyAction, setIsperformingAnyAction] = useState(false);

  const handleCreateInvent = async () => {
    setIsperformingAnyAction(true);
    try {
      const data = await createInventory(
        item_name,
        price,
        inHandQuantity,
        soldQuantity,
        date
      );
      console.log(data);
      setInventory([...inventory, data]);
    } catch (error) {
      alert("Error");
    } finally {
      setIsperformingAnyAction(false);
    }
  };
  const handleClear = () => {
    setItem_name("");
    setDate("");
    setPrice(0);
    setInHandQuantity("");
    setSoldQuantity("");
  };
  const loadAll = async () => {
    try {
      const data = await findInventory();
      setInventory([...data]);
    } catch (error) {
      alert("Error");
    }
  };
  useEffect(() => {
    loadAll();
  },[]);
  const handleDelete = async (delinventId) => {
    setIsperformingAnyAction(true);
    await deleteInventory(delinventId);
    const tempArray = inventory.filter((index) => index._id !== delinventId);
    setIsperformingAnyAction(false);
    setInventory(tempArray);
  };
  const handleFetch = async (fetchId) => {
    setIsperformingAnyAction(true);
    const fetched = await getoneInventory(fetchId);
    setIsperformingAnyAction(false);
    setItem_name(fetched?.item_name);
    setPrice(fetched?.price);
    setInHandQuantity(fetched?.inHandQuantity);
    setSoldQuantity(fetched?.soldQuantity);
    setDate(moment(fetched?.date).format("YYYY-MM-DD"));
    setFId(fetchId);
  };

  return (
    <div className="flex flex-row p-10 gap-5">
      <div className={"flex flex-col w-1/3  min-w-72 gap-3 "}>
        <div>
          <input
            id={"itemname"}
            type="String"
            value={item_name}
            onChange={(ev) => setItem_name(ev.target.value)}
            placeholder="Item Name"
            className="border rounded p-3 w-full outline-none shadow-sm"
          />
        </div>
        <div>
          <input
            type="number"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder="Price of the Item"
            className="border rounded p-3 w-full outline-none shadow-s"
          />
        </div>
        <div>
          <input
            type="String"
            value={inHandQuantity}
            onChange={(ev) => setInHandQuantity(ev.target.value)}
            placeholder="Quantity In Hand"
            className="border rounded p-3 w-full outline-none shadow-sm"
          />
        </div>
        <div>
          <input
            type="String"
            value={soldQuantity}
            onChange={(ev) => setSoldQuantity(ev.target.value)}
            placeholder="Quantity Sold"
            className="border rounded p-3 w-full outline-none shadow-sm"
          />
        </div>
        <div>
          <label htmlFor={"date"}>Date</label>
          <input
            id={"date"}
            type="date"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
            className="border rounded p-3 w-full outline-none shadow-s"
          />
        </div>
        <div>
          <div className="flex flex-row">
            <button
              className="text-orange-700 border bg-orange-200 uppercase font-bold py-2 px-4 rounded items-center flex justify-center"
              onClick={handleCreateInvent}
            >
              {isperformingAnyAction ? (
                <Loader2 className="animate-pulse h-5 w-5" />
              ) : (
                "Create"
              )}
            </button>
            <button
              className="text-rose-600 bg-rose-200 border uppercase font-bold py-2 px-5 rounded items-center flex justify-center"
              onClick={handleClear}
            >
              {isperformingAnyAction ? (
                <Loader2 className="animate-pulse h-5 w-5" />
              ) : (
                "Clear"
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        Inventory List

      <div className="grid grid-cols-3  mt-4 gap-3">
        {inventory.map((event, index) => (
          <div key={index} className="flex flex-row col-span-1 w-full rounded shadow-md p-6 border hover:bg-cyan-300 hover:bg-opacity-50 cursor-pointer"
          >
            <div className="flex w-full justify-between">
              <div>
                <div className="flex-col">
                  <span className="text-xs w-fit mb-2 bg-lime-100 p-1 rounded-md text-lime-800">
                    {moment(event.date).format("DD-MM-YYYY")}
                  </span>
                  <div className="text-4xl mt-2">{event.item_name}</div>
                </div>
                <div className={"flex flex-row gap-2 items-center"}>
                  <span className={"text-xs"}>Price</span>
                  <span className={"text-md text-right"}>{event.price}</span>
                </div>
                <div className={"flex flex-row gap-2 items-center "}>
                  <span className={"text-xs"}>Quantity in Hand</span>
                  <span className={"text-md text-right"}>
                    {event.inHandQuantity}
                  </span>
                </div>
                <div className={"flex flex-row gap-2 items-center"}>
                  <span className={"text-xs"}>Quantity Sold</span>
                  <span className={"text-md text-right"}>
                    {event.soldQuantity}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {isperformingAnyAction ? (
                <Loader2Icon className="animate-spin h-5 w-5 text-white" />
              ) : (
                <Trash2Icon
                  className="cursor-pointer h-5 w-5 text-red-600"
                  onClick={() => {
                    handleDelete(event._id);
                  }}
                />
              )}
              {isperformingAnyAction ? (
                <Loader2Icon className="animate-spin h-5 w-5 text-white" />
              ) : (
                <ArrowLeftSquare
                  className="cursor-pointer h-5 w-5 text-green-500"
                  onClick={() => {
                    handleFetch(event._id);
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Inventory;
