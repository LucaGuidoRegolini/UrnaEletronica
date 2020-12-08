import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './pages/Menu';
import Candidates from './pages/Candidates';
import Votes from './pages/Vote';
import Create from './pages/Create';

export default function Routes() {
    return(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Menu}/>
            <Route path='/candidates' component={Candidates}/>
            <Route path='/votes' component={Votes}/>
            <Route path='/create' component={Create}/>
        </Switch>
    </BrowserRouter>
    )
}