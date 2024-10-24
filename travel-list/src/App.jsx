import {useState} from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 6, packed: false },
];

function App() {

    return (
        <>
            <div className={`app`}>
                <Logo/>
                <Form/>
                <PackingList/>
                <Stats/>
            </div>
        </>
    )
}

function Logo() {
    return(
        <>
            <h1>🌴 Far Away 🌴</h1>
        </>
    )
}

function Form() {
    const [description, setDescription] = useState("")
    const [itemQuantity, setItemQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault()

        if(!description) return

        const newItem  = {
            description,
            itemQuantity,
            packed:false,
            id: Date.now()
        }

        console.log(newItem)

        setDescription("")
        setItemQuantity(1)
    }

    return(
        <>
            <form className={`add-form`} onSubmit={handleSubmit}>
                <h3>What do you need for your 😍 trip?</h3>
                <select
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(Number(e.target.value))}
                >
                    {Array.from({length: 20}, (_, i) => i + 1)
                        .map((num)=> (
                            <option key={num} value={num}>{num}</option>
                        ))
                    }
                </select>

                <input
                    type={`text`}
                    placeholder={`Item...`}
                    value={description}
                    onChange={
                        (e)=>setDescription(e.target.value)
                    }
                />
                <button>Add</button>
            </form>
        </>
    )
}

function PackingList() {
    return(
        <>
            <div className={`list`}>
                <ul>
                    {initialItems.map(item => (
                        <Item item={item} key={item.id}/>
                    ))}
                </ul>
            </div>
        </>
    )
}

function Item({item}) {
    return (
        <>
            <li>
                <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
                    {item.quantity} {item.description}
                </span>
                <button>❌</button>
            </li>
        </>
    )
}

function Stats() {
    return(
        <>
            <footer className={`stats`}>
                You have X items on your list, and you already packed X (X%)
            </footer>
        </>
    )
}

export default App
