import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ChefScreen from './screens/ChefScreen';
import RecipeScreen from './screens/RecipeScreen';
import CartScreen from './screens/CartScreen';
import HomeRecipeScreen from './screens/HomeRecipeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
function App() {
  
  return (
    
    <Router>
   
    <Header/>
    <main className='py-3'>
    <Container>
    <Route path='/order/:id' component={OrderScreen} />
    <Route path='/shipping' component={ShippingScreen} />
    <Route path='/placeorder' component={PlaceOrderScreen} />
    <Route path='/payment' component={PaymentScreen} />
    <Route path='/login' component={LoginScreen} />
    <Route path='/register' component={RegisterScreen} />
    <Route path='/profile' component={ProfileScreen} />
   <Route path='/' component={HomeScreen} exact />
   <Route path='/recipe' component={HomeRecipeScreen}  />
   <Route path='/chef/:id' component={ChefScreen} />
   <Route path='/recipe/:id' component={RecipeScreen} />
   <Route path='/cart/:id?' component={CartScreen} />
    </Container>
   
     
   </main>
    <Footer/>
    </Router>
  );
}

export default App;
