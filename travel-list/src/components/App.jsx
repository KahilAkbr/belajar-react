import {useState} from "react";
import Logo from "./Logo.jsx";
import Form from "./Form.jsx";
import PackingList from "./PackingList.jsx";
import Stats from "./Stats.jsx";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 6, packed: false },
// ];

function App() {
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems((items) => [...items, item])
    }

    function handleRemoveItem(id) {
        setItems((items) => items.filter(item => item.id !== id))
    }

    function handleToggle(id) {
        setItems((items)=>items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
        // console.log(items.map((item)=>item.id === id ? { ...item, packed: !item.packed } : item))
    }

    function clearList() {
        setItems([])
    }

    return (
        <>
            <div className={`app`}>
                <Logo/>
                <Form onAddItems={handleAddItem} />
                <PackingList items = {items} onRemoveItem={handleRemoveItem} onToggleItem={handleToggle} onClearedItems={clearList} />
                <Stats items = {items}/>
            </div>
        </>
    )
}

export default App
