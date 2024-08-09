import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Categories } from "./Categories.jsx";
import { Products } from "./Products.jsx";
import { useCategories } from "../hooks/useProducts.js";

export function Catalogue() {
    const {categories} = useCategories()

    return(
        
        <Router>
            <Routes>
                <Route path="/" element={<Categories categories={categories} />} />
                <Route path="/products/:name" element={<Products categories={categories}/>} />
            </Routes>
        </Router>
    )
}