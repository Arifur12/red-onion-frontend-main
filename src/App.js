import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header/Header";
import Banner from "./Component/Banner/Banner";
import Item from "./Component/Item/Item";
import Review from "./Component/Review/Review";
import Footer from "./Component/Footer/Footer";
import Login from "./Component/Login/Login";
import { Cart } from "./Component/CartContext/Cart";
import PlaceOrder from "./Component/PlaceOrder/PlaceOrder";
import Service from "./Component/Service/Service";
import Delivery from "./Component/Delivery/Delivery";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContextProvider, PrivateRoute } from "./use.auth";
import Search from "./Component/Search/Search";
import Admin from "./Component/Admin/Admin";
function App() {
  return (
    <div className="App">
      <Cart>
        <AuthContextProvider>
          <Router>
            <Switch>
              <Route path="/review/:productkey">
                <Header></Header>
                <Review></Review>
              </Route>
              <Route path="/admin">
                <Header></Header>
                <Admin></Admin>
              </Route>
              <Route path="/search/:id">
                <Header></Header>
                <Search></Search>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path="/delivery">
                <Header></Header>
                <Delivery></Delivery>
              </PrivateRoute>
              <Route path="/placeOrder">
                <Header></Header>
                <PlaceOrder></PlaceOrder>
                <Footer></Footer>
              </Route>
              <Route path="/">
                <Header></Header>
                <Banner></Banner>
                <Item></Item>
                <Service></Service>
                <Footer></Footer>
              </Route>
            </Switch>
          </Router>
        </AuthContextProvider>
      </Cart>
    </div>
  );
}

export default App;
