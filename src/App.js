import logo from './logo.svg';
import './App.css';
import {
  Route,
  Redirect,
  useLocation,
    useHistory
} from 'react-router-dom'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {LogoutQuery} from './utils/Query'


import Login from './features/login/login'
import { fetchLoginGet, logoutTogle } from './features/login/loginSlice';
import {fetchAccounts, fetchDeleteAccounts, togleDeleteWindow} from './features/accounts/AccountsSlice';
import Spinner from "./components/spinner/spinner";
import Wrapper from "./components/wrapper/wrapper";
import Navigation from "./components/navigation/navigation"
import DashNav from "./components/dash_vav/dash_nav"
import Calendar from './features/dashboard/dashboard_calendar'
import DashCapaigns from './features/dashboard_campaigns/dashboard_campaigns'
import DashConnections from './features/dashboard_connections/dashboard_connections'

import CampNav from "./components/campaigns_vav/camp_nav"
import CampAll from "./features/campaigns_all/campaigns_all"
import CampSchedule from "./features/campaigns_schedule/campaigns_schedule"
import NewSchedule from "./components/new_schedule/new_schedule"
import NewCampaign from "./components/new_campaign/new_campaign"
import NewCampaignConnections from "./components/new_campaign_connection2/new_campaign_connection"
import ConnNav from "./components/connections_vav/conn_nav"
import Connections from "./features/connections/connections"
import Accounts from "./features/accounts/accounts"
import AccountsNew from "./components/account_new/account_new"
import TemplatesRelevant from "./features/templates_relevant/templatesRelevant"
import TemplatesArchived from "./features/templates_archived/templates_archived"
import NewTemplate from "./components/new_template/new_template"
import TemplatesNav from "./components/templates_nav/templates_nav"
import Profile from "./components/profile/profile"
import User from "./components/user/user"
import Logout from "./components/logout_button/logout_button"
import LogoutWindow from "./components/confirm_window/window"
import styles from "./features/accounts/accounts.module.css";
import ResetButton from "./components/reset_button/reset_button";
import Button from "./components/button/button";
import MailingList from "./features/mailing_list/mailing_list"
import NewMailingList from "./components/new_mailing_list/new_mailing_list"
import SearchListShow from "./components/search_list_show/search_list_show"

function App() {
    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();

    const logedin = useSelector((state) => state.login.logedin);
    const status = useSelector((state) => state.login.status);
    const path = useSelector((state) => state.login.path);
    const logoutwindow = useSelector((state) => state.login.logout);

    const statusAccounts = useSelector((state) => state.accounts.status);
    console.log('App js');

    useEffect(() => {
        dispatch(fetchLoginGet());
    }, []) // Empty array ensures that effect is only run on mount
    useEffect(() => {
        console.log('path', path);
        history.push(path);
    }, [path]) // Empty array ensures that effect is only run on mount
    useEffect(() => {
        console.log('fetchAccounts')
        if(logedin){
            dispatch(fetchAccounts());
        }
    }, [logedin]) // Empty array ensures that effect is only run on mount
    useEffect(() => {
        history.listen((location, action) => {
            console.log(location);
            if(location.search){
                localStorage.setItem('lisaPath',location.pathname+location.search);
            }else{
                localStorage.setItem('lisaPath',location.pathname);
            }

        });
    }, [])

    const showLogin = status==='idle' || status==='loading' || statusAccounts==='loading';
    const loading = status==='idle' || status==='loading' || statusAccounts==='loading' || statusAccounts==='idle';




  return (
    <div className="App">

        {showLogin?<Spinner/>:""}
        {!logedin ?
            <Route
                exact
                path={[
                    '/login', '/signup', '*'
                ]}
            >
                <Login/>
            </Route>


            : <Route strict path='/app/'>
                <Wrapper nav={<Navigation/>} user={<User/>} logout={<Logout/>}>
                    <Route strict path='/app/dashboard/'>
                        <DashNav/>
                        <Route strict exact path='/app/dashboard/calendar'>
                            <Calendar/>
                        </Route>
                        <Route strict exact path='/app/dashboard/campaigns'>
                            <DashCapaigns/>
                        </Route>
                        <Route strict exact path='/app/dashboard/connections'>
                            <DashConnections/>
                        </Route>
                    </Route>
                    <Route strict path={['/app/campaigns/all', '/app/campaigns/schedule']}>
                        <CampNav/>
                        <Route strict exact path='/app/campaigns/all'>
                            <CampAll/>
                        </Route>
                        <Route strict exact path='/app/campaigns/schedule'>
                            <CampSchedule/>
                        </Route>
                    </Route>
                    <Route strict exact path='/app/campaigns/new_campaign'>
                        <NewCampaign/>
                    </Route>

                    <Route strict exact path='/app/search_list'>
                        <MailingList/>
                    </Route>
                    <Route strict exact path='/app/search_list_new/'>
                        <NewMailingList/>
                    </Route>
                    <Route strict exact path='/app/search_list_show'>
                        <SearchListShow/>
                    </Route>
                    <Route strict exact path='/app/campaigns/new_campaign_connection'>
                        <NewCampaignConnections/>
                    </Route>
                    <Route strict exact path='/app/campaigns/new_shedule'>
                        <NewSchedule/>
                    </Route>
                    <Route strict path={['/app/connections/outgoing', '/app/connections/incoming']}>
                        <ConnNav/>
                        <Route strict exact path='/app/connections/outgoing'>
                            <Connections dirrection={'outgoing'}/>
                        </Route>
                        <Route strict exact path='/app/connections/incoming'>
                            <Connections dirrection={'incoming'}/>
                        </Route>
                    </Route>
                    <Route strict exact path='/app/accounts'>
                        <Accounts/>
                    </Route>
                    <Route strict exact path='/app/accounts/new'>
                        <AccountsNew/>
                    </Route>
                    <Route strict path={['/app/templates/relevant', '/app/templates/archived']}>
                        <TemplatesNav/>
                        <Route strict exact path='/app/templates/relevant'>
                            <TemplatesRelevant/>
                        </Route>
                        <Route strict exact path='/app/templates/archived'>
                            <TemplatesArchived/>
                        </Route>
                    </Route>
                    <Route strict exact path='/app/templates/new_templates'>
                        <NewTemplate/>
                    </Route>
                    <Route strict exact path='/app/profile'>
                        <Profile/>
                    </Route>
                </Wrapper>
            </Route>
        }
        {logoutwindow?<LogoutWindow
            header={'Log Out?'}
            subheader={'Are you sure you want to logout?'}
            buttons={
                <div className={styles.ImportContainer}>
                    <div className={styles.buttonWrapperImport} style={{width:'55px'}}>
                        <ResetButton
                            click={()=>{console.log('test'); dispatch(logoutTogle(false))}}
                            name={'Cancel'}
                            width={'51px'}
                        />
                    </div>
                    <div className={styles.buttonWrapperImport}>
                        <Button
                            name={"Yes"}
                            click={()=>{LogoutQuery().then(()=>{window.location.reload()})}}
                        />
                    </div>

                </div>
            }
        />:''}

    </div>


  );
}

export default App;
