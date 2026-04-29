import placeText from "../../assets/placeText.png.webp";
import address from "../../assets/address.png.webp";

import './Location.scss';

export const Location = () => {
    return (
        <div className="location">
            <div className="placeText">
                <img
                    src={placeText}
                    alt="Место проведения"
                    className="placeTextImg"
                />
            </div>

            <img
                src={address}
                alt="Адрес проведения"
                className="address"
            />
        </div>

    )
}