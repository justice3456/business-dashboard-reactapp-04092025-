import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/Home");
    };

    return (
        <div className="no-page">
            <h1>No Page Found &#128577;</h1>
            <p onClick={goToHome} className="go-to-home">Go to Home</p>
        </div>
    );
}


