import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import StarRating from "./StarRating.jsx";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
      // <StarRating maxRating={5} size={64} messages={["Okay1", "Okay2", "Okay3", "Okay4", "Okay5"]} defaultRating={5}/>
  // </StrictMode>,
)
