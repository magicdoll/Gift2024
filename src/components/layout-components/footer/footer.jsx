
import { Fragment } from "react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <Fragment>
            <footer className="footer mt-auto py-2 bg-white text-center">
                <div className="container">
                    <span className="text-muted"> Copyright © <span id="year">2024 </span>
                        <Link to="#!" className="text-dark fw-medium">Autoliv</Link>.
                        Designed with 
                        <span className="bi bi-heart-fill text-danger" style={{ margin: '0 8px' }}></span> by 
                        <Link to="#!">
                            <span className="fw-medium text-primary" style={{ margin: '0 8px' }}>IT Team - Thailand</span>
                        </Link>
                    </span>
                </div>
            </footer>

        </Fragment>
    );
};

export default Footer;
