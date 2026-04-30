import stayedBefore from "../../assets/stayedBefore.png.webp";
import './Footer.scss'; // Не забудьте импортировать стили!

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <img
                    src={stayedBefore}
                    alt="Ждем с нетерпением"
                    className="footer-img"
                />
            </div>
        </footer>
    )
}