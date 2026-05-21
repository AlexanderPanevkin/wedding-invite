import { useSyncExternalStore } from 'react'; // ← Импортируем правильный хук
import details from "../../assets/details.png.webp";
import "./Details.scss";
import { motion } from 'framer-motion';
import cloud from '../../assets/cloud.png.webp';

// 🔥 Хук для отслеживания мобильного экрана (без ошибок линтера)
const useIsMobile = (breakpoint = 768) => {
    // Функция подписки: сообщаем браузеру, что мы хотим следить за изменениями
    const subscribe = (callback: () => void) => {
        const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        // В современных браузерах используем addEventListener
        mq.addEventListener('change', callback);
        // Функция отписки (очистка)
        return () => mq.removeEventListener('change', callback);
    };

    // Функция получения текущего значения (синхронная)
    const getSnapshot = () => {
        return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
    };

    // useSyncExternalStore сам управляет подпиской и обновлениями
    return useSyncExternalStore(subscribe, getSnapshot);
};

export const Details = () => {
    const isMobile = useIsMobile();

    return (
        <div className="details-wrapper">
            <img src={details} alt="Детали" className="details" />

            {/* ☁️ Тучка с адаптивной анимацией */}
            <motion.img
                src={cloud}
                alt=""
                className="cloud cloud-1"
                animate={{
                    x: isMobile ? [250, 180, 250] : [1000, 950, 1000],
                    y: isMobile ? [-35, -32, -35] : [-20, -17, -20],
                }}
                transition={{
                    x: {
                        duration: isMobile ? 40 : 20,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    y: {
                        duration: isMobile ? 7 : 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            />
            <motion.img
                src={cloud}
                alt=""
                className="cloud cloud-2"
                animate={{
                    // 🔥 Обратите внимание: x от положительного к отрицательному = движение справа налево
                    x: isMobile ? [-30, 50, -30] : [710, 760, 710],
                    y: isMobile ? [260, 263, 260] : [450, 455, 450], // Покачивание ВНИЗ (положительное значение)
                }}
                transition={{
                    // 🔥 Другая скорость для разнообразия
                    x: { duration: isMobile ? 50 : 20, repeat: Infinity, ease: "linear" },
                    y: { duration: isMobile ? 7 : 5, repeat: Infinity, ease: "easeInOut" },
                }}
            />
        </div>
    )
}