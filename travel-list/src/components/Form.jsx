import {useState} from "react";

function Form({onAddItems}) {
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

        onAddItems(newItem)

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

export default Form