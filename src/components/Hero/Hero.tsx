import heroPhoto from '../../assets/hero.png.webp'
import './Hero.scss';

export const Hero = () => {
    return (
                    <img
                        src={heroPhoto}
                        alt="Жених и Невеста"
                        className="hero"
                    />
    )
}