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
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ChefListScreen from './screens/ChefListScreen';
import ChefEditScreen from './screens/ChefEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import RecipeEditScreen from './screens/RecipeEditScreen';
import AboutScreen from './screens/AboutScreen';
import UserRecipeListScreen from './screens/UserRecipeListScreen';
import UserRecipeDetailScreen from './screens/UserRecipeDetailScreen';


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
   <Route path='/myrecipe' component={HomeRecipeScreen}  />
   <Route path='/chef/:id' component={ChefScreen} />
   <Route path='/recipe/:id' component={RecipeScreen} />
   <Route path='/cart/:id?' component={CartScreen} />
   <Route path='/admin/userlist' component={UserListScreen} />
   <Route path='/admin/user/:id/edit' component={UserEditScreen} />
   <Route path='/admin/cheflist' component={ChefListScreen} />
   <Route path='/admin/chef/:id/edit' component={ChefEditScreen} />
   <Route path='/admin/orderlist' component={OrderListScreen} />
   <Route path='/admin/recipelist' component={RecipeListScreen} />
   <Route path='/admin/recipe/:id/edit' component={RecipeEditScreen} />
   <Route path='/search/:keyword' component={HomeScreen} />
   <Route path='/searchrecipe/search/:keywordrecipe' component={HomeRecipeScreen} />
   <Route path='/about' component={AboutScreen}/>
   <Route path='/admin/userRecipelist' component={UserRecipeListScreen} />
   <Route path='/admin/userRecipe/:id' component={UserRecipeDetailScreen}/>
    </Container>
   
     
   </main>
    <Footer/>
    </Router>
  );
}

export default App;
