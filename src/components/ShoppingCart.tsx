import React, { useReducer, useState } from 'react';

interface ShoppingCartItem {
    id: number;
    name: string;
    price: number; 
}

interface ItemState {
    items: ShoppingCartItem[];
}

type ShoppingCartAction =
    | { type: 'ADD_ITEM'; payload: ShoppingCartItem }
    | { type: 'REMOVE_ITEM'; payload: number };

const shoppingCartReducer = (state: ItemState, action: ShoppingCartAction): ItemState => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id !== action.payload) };
        default:
            return state;
    }
};

const ShoppingCart: React.FC = () => {
    const [state, dispatch] = useReducer(shoppingCartReducer, { items: [] });
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: ShoppingCartItem = { id: Date.now(), name: itemName, price: itemPrice }; 
        dispatch({ type: 'ADD_ITEM', payload: newItem });
        setItemName('');
        setItemPrice(0); // Reset price after adding item
    };

    const removeItem = (itemId: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    };

    const calculateTotalCost = () => {
        return state.items.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <form onSubmit={addItem}>
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Enter Item Name"
                />
                <input 
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(parseFloat(e.target.value))} 
                    placeholder='Enter Item Price'
                />
                <button type="submit">Add Item</button>
            </form>

            <ul>
                {state.items.map((item) => (
                    <li key={item.id}>
                        Item: {item.name}{' '} <br />
                        Price: ${item.price} <br /> 
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>
            <p>Total Cost: ${calculateTotalCost().toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ShoppingCart;