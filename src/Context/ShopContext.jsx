import React, { createContext,useState } from "react";
import all_product from './../Components/Assets/all_product';
export const ShopContext=createContext(null);

const getDefaultCart = () => {
    let cart = {
        items: {},
        sizes: {}
    };
    for (let index = 0; index < all_product.length+1; index++) {
        cart.items[index] = 0;
        cart.sizes[index] = [];
    }
    return cart;
}

const ShopContextProvider=(props)=>{
   const [cartItems, setCartItems] = useState(getDefaultCart());

   const addToCart = (itemId, size) => {
    setCartItems((prev) => {
        const newItems = { ...prev.items, [itemId]: prev.items[itemId] + 1 };
        const newSizes = { ...prev.sizes };
        if (!newSizes[itemId]) {
            newSizes[itemId] = [];
        }
        newSizes[itemId].push(size);
        return {
            items: newItems,
            sizes: newSizes
        };
    });
   }

   const removeFromCart = (itemId, index) => {
    setCartItems((prev) => {
        const newItems = { ...prev.items, [itemId]: prev.items[itemId] - 1 };
        const newSizes = { ...prev.sizes };
        newSizes[itemId] = newSizes[itemId].filter((_, i) => i !== index);
        return {
            items: newItems,
            sizes: newSizes
        };
    });
   }

   const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems.items) {
        if (cartItems.items[item] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            totalAmount += itemInfo.new_price * cartItems.items[item];
        }
    }
    return totalAmount;
};

const getTotalCartItem = () => {
    let totalCartItem = 0;
    for (const item in cartItems.items) {
        if (cartItems.items[item] > 0) {
           totalCartItem += cartItems.items[item];
        }
    }
    return totalCartItem;
};


   const contextValue={
       all_product,
       cartItems,
       addToCart,
       removeFromCart,
       getTotalCartAmount,
       getTotalCartItem
   };
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;