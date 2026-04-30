import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './Timing.scss';
import timingImg from '../../assets/Timing.png.webp';
import cloud from '../../assets/cloud.png.webp';
import car from '../../assets/car.png.webp';

export const Timing = () => {
    const containerRef = useRef(null);

    // Состояние для отслеживания мобильного устройства
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 🔥 ВАЖНО: Вызываем ВСЕ хуки useTransform БЕЗ условий if/else

    // 1. Десктопные траектории (ваши исходные значения)
    const desktopCarX = useTransform(scrollYProgress, [0.25, 0.27, 0.30, 0.66, 0.75], [0, -50, -90, 80, -70]);
    const desktopCarY = useTransform(scrollYProgress, [0.25, 0.27, 0.30, 0.66, 0.75], [0, 50, 100, 240, 330]);
    const desktopCloudX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 230, 0]);

    // 2. Мобильные траектории (упрощенные значения)
    // Подберите эти числа под мобильную версию картинки
    const mobileCarX = useTransform(scrollYProgress, [0.25, 0.27, 0.30, 0.66, 0.75], [0, -50, -65, 105, -45]);
    const mobileCarY = useTransform(scrollYProgress, [0.25, 0.27, 0.30, 0.66, 0.75], [0, 50, 90, 225, 310]);
    const mobileCloudX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 230, 0]);

    return (
        <div className="timing-wrapper" ref={containerRef}>
            <img
                src={timingImg}
                alt="Тайминг мероприятия"
                className="timing-image"
            />

            {/* Тучка: выбираем нужную траекторию через тернарный оператор */}
            <motion.img
                src={cloud}
                alt="Туча"
                className="cloud"
                style={{
                    x: isMobile ? mobileCloudX : desktopCloudX
                }}
            />

            {/* Машинка: выбираем нужную траекторию через тернарный оператор */}
            <motion.img
                src={car}
                alt="Машинка"
                className="car"
                style={{
                    x: isMobile ? mobileCarX : desktopCarX,
                    y: isMobile ? mobileCarY : desktopCarY,
                    rotate: -5 // Фиксированный поворот
                }}
            />
        </div>
    )
}