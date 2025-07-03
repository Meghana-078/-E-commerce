import adminlogin from "./assets/login.jpg"
import admin from "./assets/admin.jpg"
import { Link } from "react-router-dom"
function AdminLogin(){
    const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();
    alert(result.message);
     if (result.admin) {
  localStorage.setItem('admin', JSON.stringify(result.admin));
  window.location.href = '/admin/profile';  
}
  };
 

    return(
        <>
         <div
                  style={{
                    backgroundImage: `url(${adminlogin})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#fff',
                    textShadow: '1px 1px 5px #000',
                   }}>
        <div className="main">
            <form onSubmit={handleLogin}>
                <center><strong>Admin Login</strong></center>
                <br/>
                <center><img src={admin} width={"50px"} height={"50px"}/>
</center>
                <div className="adminemail">
                    <label for="email">Email</label>
                    <br/>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Email"/>
                </div>
                <div className="adminpassword">
                    <label for="pass">Password</label>
                    <br/>
                    <input 
                    type="password" 
                    id="pass" 
                    name="password" 
                    placeholder="Password"/>
                </div>
                <div className="loginpage">
                    <button type="submit">Login</button>
                </div>
                 <div className="createacc">
                    <Link to="/AdminSignup"><button>Create Account</button></Link>
                </div>
            </form>

        </div>
        </div>
        </>
    )
}

export  default AdminLogin