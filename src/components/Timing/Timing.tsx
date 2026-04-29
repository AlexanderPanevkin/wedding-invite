import './Timing.scss';
import timingImg from '../../assets/Timing.png.webp';
import cloud from '../../assets/cloud.png.webp';
import car from '../../assets/car.png.webp';
export const Timing = () => {
    return (
        <div className="timing-wrapper">
            <img
                src={timingImg}
                alt="Тайминг мероприятия"
                className="timing-image"
            />
            <img
                src={car}
                alt="Машинка"
                className="car"
            />
            <img
                src={cloud}
                alt="Туча"
                className="cloud"
            />
        </div>

    )
}