import React from 'react';
import NavComponent from './nav.component';
import SignUp  from '../component/page/signup'; 
import SignIn  from './page/signin';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EmployeeComponent from './page/employee';
import View from './page/view';
import ManagerComponent from './page/manager';


export const MainComponent: React.FC = () => {
    return <div>
                <BrowserRouter>
                    <NavComponent></NavComponent>
                    <main>
                        <Switch>
                            <Route exact path='/SignUp'  >
                                <SignUp> </SignUp>
                            </Route>
                            <Route exact path='/'>
                                <SignIn></SignIn>
                            </Route>                         
                            <Route exact path='/View/:Role/:id/'>
                                <View></View>
                            </Route>
                            <Route exact path='/EmployeeComponent'>
                                <EmployeeComponent></EmployeeComponent>
                            </Route>
                            <Route exact path='/ManagerComponent'>
                                <ManagerComponent></ManagerComponent>
                            </Route>

                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
    }
