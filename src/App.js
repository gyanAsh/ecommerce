import React,{useState,useEffect} from 'react';
import {Navbar, Products ,Cart} from './Componets';
import {commerce} from './lib/commerce';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom';

const App = () => {
    const [products, setProducts]=useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts=async()=>{
        const {data}=await commerce.products.list();
        setProducts(data);
    }

    const fetchCart=async()=>{
         
        setCart(await commerce.cart.retrieve());
    }

    useEffect(()=>{
        fetchProducts();
        fetchCart();
    },[]);
 console.log(cart);

const handleAddCart=async(productId,quantity)=>{
    const response= await commerce.cart.add(productId, quantity);
    setCart(response.cart)
}

const handleUpdateCartQty=async(productId, quantity)=>{
    const {cart}=await commerce.cart.update(productId,{quantity })
    setCart(cart);
}

const handleRemoveFromCart=async(productId)=>{
    const {cart}=await commerce.cart.remove(productId);
    setCart(cart);
}

const handleEmptyCart=async()=>{
    const {cart} =await commerce.cart.empty();
    setCart(cart);
}

    return (
        <Router>
        <div>
            <Navbar cartItem={cart.total_items}/>
            <Switch>
                <Route exact path="/">
                <Products products={products} onAddToCart={handleAddCart} />
                </Route>
                <Route exact path="/cart">
                <Cart cart={cart} handleUpdateCartQty= {handleUpdateCartQty}
handleRemoveFromCart= {handleRemoveFromCart}
handleEmptyCart= {handleEmptyCart}/>
                </Route>
            </Switch>
        </div>
        </Router>
    )
}

export default App
 