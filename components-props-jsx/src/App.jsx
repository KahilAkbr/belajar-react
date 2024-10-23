import './App.css'

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
  return (
    <div className="container">
        <Header/>
        <Menu/>
        <Footer/>
    </div>
  )
}

function Header() {
    return (
        <header className={`header`}>
            <h1>
                Fast React Pizza Co.
            </h1>
        </header>
    )
}

function Menu() {
    const pizzas = pizzaData
    const numPizza = pizzas.length

    return (
        <div className={`menu`}>
            <h2>Our menu</h2>

            {numPizza > 0 ? (
                <>
                    <p>
                        Deskripsi Title
                    </p>
                    <ul className="pizzas">
                        {pizzaData.map(pizza => <Pizza pizzaObject={pizza} key={pizza.name}/>)}
                    </ul>
                </>

            ) :
                <p>
                We're still working on our menu. Please come back later!
                </p>
            }
        </div>
    )
}

function Pizza({pizzaObject}) {
    // if (pizzaObject.soldOut) return null

    return (
        <li className={`pizza ${pizzaObject.soldOut ? `sold-out` : `null`}`}>
            <img src={pizzaObject.photoName} alt={pizzaObject.name} />
            <div>
                <h3>{pizzaObject.name}</h3>
                <p>{pizzaObject.ingredients}</p>

                {pizzaObject.soldOut ? (
                    <span>SOLD OUT</span>
                ) :
                    <span>{pizzaObject.price}</span>
                }

                {/*<span>{pizzaObject.soldOut ? "SOLD OUT" : pizzaObject.price}</span>*/}
            </div>
        </li>
    )
}

function Footer() {
    const hour = new Date().getHours()
    const openHour = 12
    const closeHour = 22
    const isOpen = hour >= openHour && hour <= closeHour
    console.log(isOpen)

    // if(hour >= openHour && hour <= closeHour){
    //     alert("We're currently open!")
    // } else {
    //     alert("Sorry we're close!")
    // }

    // if(!isOpen)
    //     return (
    //         <p>
    //             Sorry we're closed
    //         </p>
    //     )

    return (
        <footer className={`footer`}>
            {isOpen ? (
                <Order
                    closeHour={closeHour}
                />
            ) :
                <div className={`order`}>
                    <p>
                        Sorry we're closed
                    </p>
                </div>
            }
        </footer>
    )
}

function Order({closeHour}) {
    return (
        <div className={`order`}>
            <p>
                We're open until {closeHour}:00
            </p>
            <button className={`btn`}>Order</button>
        </div>
    )
}

export default App
