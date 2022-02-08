import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import './CSS/signInForm.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {NavigationBar} from "./Javascript/NavigationBar"
import {SignInForm} from "./Javascript/SignInForm"

class APP extends React.Component {
    /* Cookie*/
    isLogin = function() {
        let getCookie = (cookieName) => {
            let cookie = {};
            document.cookie.split(';').forEach(function (el) {
                let [key, value] = el.split('=');
                cookie[key.trim()] = value;
            })
            return cookie[cookieName];
        }
        return getCookie("username") === undefined
    }
    constructor(props) {
        super(props);
        this.state = {
            isLogin: this.isLogin()
        }
    }
    render() {
        let i = <div>
            <NavigationBar isHidden={this.state.isLogin}/>
            <SignInForm isHidden={!this.state.isLogin}/>
        </div>
        return i
    }
}
ReactDOM.render(
    <APP/>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
