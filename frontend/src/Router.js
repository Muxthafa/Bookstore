import Registration from "./pages/signUp.jsx";
import Signin from "./pages/signIn.jsx";
import ForgetPassword from "./pages/forgetPassword.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import Error from "./pages/Error.jsx"
import Dashboard from "./pages/dashboard.jsx"
import Cart from './pages/cart.jsx'
import Order from './pages/order.jsx'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/**
 * @description Router component enables the navigation among various components view
 * @returns 
 */
export default function Routers() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Registration} />
          <Route path="/login" component={Signin} />
          <Route path="/forgot-password" component={ForgetPassword} />
          <Route path="/reset/:token" component={ResetPassword} />
          <Route path="/books" component={Dashboard} />
          <Route path='/cart' component={Cart} />
          <Route path='/order' component={Order} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </>
  );
}
