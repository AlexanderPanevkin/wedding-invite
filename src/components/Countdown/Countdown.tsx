import { useState, useEffect } from 'react';
import './Countdown.scss';
import ring from "../../assets/ring.png.webp";

// 🔥 УСТАНОВИТЕ ДАТУ ВАШЕЙ СВАДЬБЫ ЗДЕСЬ
// Формат: ГГГГ-ММ-ДДTЧЧ:ММ:СС
const WEDDING_DATE = new Date('2026-08-16T15:30:00').getTime();

export const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = WEDDING_DATE - now;

            if (distance < 0) {
                // Если дата прошла, обнуляем таймер или пишем "Ура!"
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                // Вычисления времени
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Функция для добавления ведущего нуля (05 вместо 5)
    const formatTime = (num: number) => num.toString().padStart(2, '0');

    return (
        <section className="countdown-section">
            <div className="container">
                <div>
                    <img
                        src={ring}
                        alt="До свадьбы осталось"
                        className="ring"
                    />
                </div>

                <div className="timer-wrapper">
                    <div className="timer-item">
                        <span className="timer-value">{formatTime(timeLeft.days)}</span>
                        <span className="timer-label">Дней</span>
                    </div>

                    <div className="timer-separator">:</div>

                    <div className="timer-item">
                        <span className="timer-value">{formatTime(timeLeft.hours)}</span>
                        <span className="timer-label">Часов</span>
                    </div>

                    <div className="timer-separator">:</div>

                    <div className="timer-item">
                        <span className="timer-value">{formatTime(timeLeft.minutes)}</span>
                        <span className="timer-label">Минут</span>
                    </div>

                    <div className="timer-separator">:</div>

                    <div className="timer-item">
                        <span className="timer-value">{formatTime(timeLeft.seconds)}</span>
                        <span className="timer-label">Секунд</span>
                    </div>
                </div>
            </div>
        </section>
    );
};