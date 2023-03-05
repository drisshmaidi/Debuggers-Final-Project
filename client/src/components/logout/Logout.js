import { useNavigate } from "react-router-dom";

const Logout = () =>{

    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.setItem("Token","");
        navigate("/signin");
    };

    return(<button onClick={handleLogout} className="btn btn-primary">Logout</button>);

};

export default Logout;