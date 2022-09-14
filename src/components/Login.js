import { useState } from "react"
import { useHistory } from "react-router"

export default function Login({ getUser }) {
    const history = useHistory()
    const [signUp, setSignUp] = useState(false)

    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" })
    const [user, setUser] = useState({})
    const [wrongPass, setWrongPass] = useState(false)
    const [emptyError, setEmptyError] = useState('')
    const [signUpDetails, setSignUpDetails] = useState({ first_name: "", last_name: "", email: "", password: "", birthday: "", callsign: "" })

    LookForUser(loginDetails.email)
    function handleLogin(e) {
        setLoginDetails(details => ({ ...details, [e.target.name]: e.target.value }))
    }
    function handleLoginSubmit(e) {
        e.preventDefault()
        
        console.log(loginDetails.password, user.password)
        if (loginDetails.password === user.password) {
            console.log("success");
            setWrongPass(false)
            getUser(user)
            history.push("/home")
        } else {
            setWrongPass(true)
            setLoginDetails(details => ({ ...details, password: "" }))
        }
    }
    function handleSignUp(e) {
        setSignUpDetails(details => ({ ...details, [e.target.name]: e.target.value }))
    }

    function handleSignUpSubmit(e) {
        e.preventDefault()

        let empty = Object.keys(signUpDetails).find(key => signUpDetails[key] === "")
        console.log(empty)
        if (empty) {
            setEmptyError(`${empty} field cannot be empty!`)
        } else {
            //post the data
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signUpDetails)
            }
            fetch('http://localhost:9292/player', options)
                .then(r => r.json())
                .then(usernew => {
                    getUser(usernew)
                    history.push("/home")
                })

        }

    }

    function LookForUser(email) {
        fetch(`http://localhost:9292/players/${email}`)
            .then(r => r.json())
            .then(setUser).catch()
    }
    return (
        <div className="login">
            <div id="sign-up-logo" className="logo">
                <img alt="" src="/pictures/logo.png" />
                <h3>AIMKEYS</h3>
                <h2>GAMEPLACE</h2>
            </div>
            {signUp ? null : <div>
                <form onSubmit={handleLoginSubmit}>
                    <label>Email/username</label>
                    <input onBlur={(e)=>LookForUser(e.target.value)} id="email" name="email" onChange={handleLogin} placeholder="Enter email or call sign" type={'text'} value={loginDetails.email} />
                    <label htmlFor="pass">Password</label>
                    <input onChange={handleLogin} name="password" type={"password"} id="pass" value={loginDetails.password} />
                    <button>Log in</button>
                </form>
            </div>}

            {signUp ? <div>
                <form onSubmit={handleSignUpSubmit}>
                    <input onChange={handleSignUp} value={signUpDetails.first_name} name="first_name" type={"text"} placeholder="First name" />

                    <input onChange={handleSignUp} value={signUpDetails.last_name} name="last_name" type="text" placeholder="Last name" />
                    <input onChange={handleSignUp} value={signUpDetails.callsign} name="callsign" type={"text"} placeholder="Call sign" />
                    <input onChange={handleSignUp} value={signUpDetails.email} name="email" type={'text'} placeholder="Email" />
                    <input onChange={handleSignUp} value={signUpDetails.password} name="password" type={'password'} placeholder='Enter password' />
                    <label>Birthday</label>
                    <input onChange={handleSignUp} type={'date'} value={signUpDetails.birthday} name='birthday' />
                    <button>Sign Up</button>
                </form>
            </div> : null}
            {!signUp && wrongPass ? <p className="error">Wrong password. Try again.</p> : null}
            {!signUp && !user ? <p className="error">Email or call sign not found!</p> : null}
            {signUp && emptyError !== "" ? <p className="error">{emptyError}</p> : null}
            <p style={{ margin: "-2px", textAlign: "left" }}>{signUp ? "Already has an account?" : "Don't have an account yet?"}<em style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => setSignUp(sign => !sign)}>{signUp ? "Log in" : "sign up"}</em></p>
        </div>
    )
}