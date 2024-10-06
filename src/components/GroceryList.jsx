import { useState, useEffect } from "react";
import GroceryItem from "./GroceryItem.jsx";
import AddItemForm from "./AddItemForm.jsx";
import { supabase } from "../supabaseClient.js";

function GroceryList() {
  const [items, setItems] = useState([]);

  // const addItem = (name) => {
  //   if (name.trim()) {
  //     setItems([...items, { id: items.length, name }]);
  //   }
  // };

  // const deleteItem = (id) => {
  //   setItems(items.filter((item) => item.id !== id));
  // };

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from("groceries")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching groceries: ", error);
      } else {
        setItems(data);
      }
    }

    fetchItems();
  }, []);

  async function addItem(name) {
    if (name.trim()) {
      const { error } = await supabase.from("groceries").insert([{ name }]);

      if (error) {
        console.error("Error adding grocery: ", error);
      } else {
        const { data: updatedData, error: fetchError } = await supabase
          .from("groceries")
          .select("*")
          .order("created_at", { ascending: true });

        if (fetchError) {
          console.error("Error fetching updated groceries: ", fetchError);
        } else {
          setItems(updatedData);
        }
      }
    }
  }

  async function deleteItem(id) {
    const { error } = await supabase.from("groceries").delete().eq("id", id);

    if (error) {
      console.error("Error deleting grocery: ", error);
    } else {
      const { data: updatedData, error: fetchError } = await supabase
        .from("groceries")
        .select("*")
        .order("created_at", { ascending: true });

      if (fetchError) {
        console.error("Error fetching updated groceries: ", fetchError);
      } else {
        setItems(updatedData);
      }
    }
  }

  return (
    <div>
      <h2>Grocery List</h2>
      <AddItemForm addItem={addItem} />
      {items.length === 0 ? (
        <p>No items added to grocery list!</p>
      ) : (
        <ul>
          {items.map((item) => (
            <GroceryItem key={item.id} item={item} deleteItem={deleteItem} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroceryList;
