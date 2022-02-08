import React from "react";

class SignInForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {"isHidden": props.isHidden}
    }
    render() {
        if (this.state.isHidden) { //hide the form
            document.getElementsByTagName("body")[0].style.backgroundColor = "white"
        } else {
            document.getElementsByTagName("body")[0].style.backgroundColor = "rgba(0, 0, 0, 0.3)"
        }
        return !this.state.isHidden && <FormBody/>
    }
}
class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.label = props.label
        this.type = props.type
        this.state = {"value":""}
    }
    inputChangeHandler = function (event) {
        this.setState({"value" : event.target.value})
    }
    submitChangeHandler = function (event) {
        console.log(this.state)
    }
    render() {
        return <div>
            <label>{this.label}</label>
            <input type={this.type} onChange={this.inputChangeHandler.bind(this)}></input>
        </div>
    }
}
class FormBody extends React.Component {
    constructor(props) {
        super(props);
        this.firstNameReference = React.createRef()
        this.lastNameReference = React.createRef()
        this.emailReference = React.createRef()
        this.birthdayReference = React.createRef()
        this.passwordReference = React.createRef()
        this.reTypepasswordReference = React.createRef()
    }
    submit = function (event) {
        event.preventDefault()
        let firstName = this.firstNameReference.current.state.value
        let lastName = this.lastNameReference.current.state.value
        let email = this.emailReference.current.state.value
        let birthday = this.birthdayReference.current.state.value
        let password = this.passwordReference.current.state.value
        let reTypedPassword = this.reTypepasswordReference.current.state.value
        if (firstName === "" || lastName === "" || email === "" || birthday === "" || password === "" || reTypedPassword === "") {
            alert("Some of the fields are empty")
            return
        }
        if (password.length < 8) {
            alert("Password too short")
            return
        }
        if (password !== reTypedPassword) {
            alert("Check your password")
        }
        let createUser = async () => {
            let httpBody = {
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "birthday":birthday,
                "password":password
            }
            let url = "https://z3yhnde0re.execute-api.us-east-2.amazonaws.com/default/skrskr"
            let httpResponse = await fetch(url, {
                method:"POST",
                body: JSON.stringify(httpBody)
            })
            let parsedResponse = await httpResponse.json()
            console.log(parsedResponse)
            if (parsedResponse["status"] === 200 && parsedResponse["statusText"] === "OK") {
                console.log(parsedResponse)
            } else {
                throw new Error()
            }
        }
        createUser().catch(()=>{
            window.location.reload()
        })
    }
    render() {
        return <div className="signin">
            <div id="start_pebbling">Start Pebbling Today</div>
            <div id="create_account"><b>Create Your Account</b></div>
            <form id = "signInForm" action="post" onSubmit={this.submit.bind(this)}>
                <div className="form-group" id="name">
                    <div className="firstName">
                        <FormInput type="text" label = "First Name" ref={this.firstNameReference}/>
                    </div>
                    <div className="lastName">
                        <FormInput type="text" label = "Last Name" ref = {this.lastNameReference}/>
                    </div>
                </div>
                <div className="form-group">
                    <FormInput type="date" label = "Birthday" ref = {this.birthdayReference}/>
                </div>
                <div className="form-group">
                    <FormInput type="email" label = "Email" ref = {this.emailReference} />
                </div>
                <div className="form-group">
                    <FormInput type="password" label = "Password" ref = {this.passwordReference} />
                </div>
                <div className="form-group">
                    <FormInput type="password" label = "Password Confirmation" ref = {this.reTypepasswordReference} />
                </div>
                <button id={"createAccount"}>Create Account</button>
            </form>
        </div>
    }
}
export {SignInForm}