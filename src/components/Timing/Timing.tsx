import './Timing.scss';
import timingImg from '../../assets/Timing.png.webp';
export const Timing = () => {
    return (
        <img
            src={timingImg}
            alt="Тайминг мероприятия"
            className="timing-image"
        />
    )
}