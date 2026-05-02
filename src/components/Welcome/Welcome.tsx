import { useState, useEffect } from 'react';
import envelopeImg from '../../assets/Envelope.png.webp';
import './Welcome.scss';

export const Welcome = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    // 🔥 Предзагрузка аудио при монтировании
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
            const audio = new Audio('/italian-music.mp3'); // 🔥 прямой путь из public
            audio.preload = 'auto';
            audio.load();
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isVisible]);

    const handleOpen = () => {
        const audio = new Audio('/italian-music.mp3'); // 🔥 прямой путь из public
        audio.loop = true;
        audio.volume = 0.5;

        audio.play()
            .then(() => {
                console.log('Музыка запущена');
            })
            .catch(error => {
                console.error('Ошибка воспроизведения музыки:', error);
            });

        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = '';
        }, 500);
    };

    if (!isVisible) return null;

    return (
        <div className={`welcome-overlay ${isClosing ? 'closing' : ''}`}>
            <div className="welcome-content">
                <div className="welcome-image-wrapper">
                    <img
                        src={envelopeImg}
                        alt="Приглашение"
                        className="welcome-image"
                    />
                    <button onClick={handleOpen} className="welcome-button">
                        Нажмите, чтобы открыть
                    </button>
                </div>
            </div>
        </div>
    );
};
