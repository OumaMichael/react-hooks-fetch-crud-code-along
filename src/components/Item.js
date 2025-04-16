import React from "react";

// src/components/Item.js
function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick() {
    const updatedItem = {
      ...item,
      isInCart: !item.isInCart,
    };

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: updatedItem.isInCart }),
    })
      .then((r) => r.json())
      .then(onUpdateItem);
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    }).then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
