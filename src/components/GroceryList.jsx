import { useState } from "react";
import GroceryItem from "./GroceryItem.jsx";
import AddItemForm from "./AddItemForm.jsx";

function GroceryList() {
  const [items, setItems] = useState([]);

  const addItem = (name) => {
    if (name.trim()) {
      setItems([...items, { id: items.length, name }]);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

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
