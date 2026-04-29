import details from "../../assets/details.png.webp";
import "./Details.scss";

export const Details = () => {
    return (
    <div className="details-wrapper">
        <img
        src={details}
        alt="Детали"
        className="details"
    />
    </div>
    )
}