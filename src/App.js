import MemberList from "./container/MemberList";
import Members from "./container/Members";
import MemberDetails from "./container/MemberDetails";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" exact component={Members}>
        </Route>
        <Route path="/member/:id" component={MemberDetails}>
        </Route>
        <Route path="/memberList" component={MemberList}>
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
