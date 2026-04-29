import placeText from "../../assets/placeText.png.webp";
import address from "../../assets/address.png.webp";

import './Location.scss';

// export const Location = () => {
//     return (
//         <div className="location">
//             <div className="placeText">
//                 <img
//                     src={placeText}
//                     alt="Место проведения"
//                     className="placeTextImg"
//                 />
//             </div>
//             <div className="address-wrapper">
//                 <img
//                     src={address}
//                     alt="Адрес проведения"
//                     className="address"
//                 />
//                    <div className="map-wrapper">
//                     <iframe
//                         src="https://yandex.by/map-widget/v1/?ll=27.124638%2C53.740723&z=15&pt=27.124638,53.740723"
//                         width="40%"
//                         height="450"
//                         allowFullScreen={true}
//                         title="Карта места проведения"
//                         className="location-map"
//                     ></iframe>
//                 </div>
//             </div>
//
//         </div>
//     )
// }

export const Location = () => {
    return (
        <section className="location-section">
            <div className="container">
                {/* Заголовок-картинка */}
                <div className="location-title-wrapper">
                    <img
                        src={placeText}
                        alt="Место проведения"
                        className="location-title-img"
                    />
                </div>

                {/* Основной контент */}
                <div className="location-content">
                    {/* Адрес (картинка) */}
                    <div className="address-block">
                        <img
                            src={address}
                            alt="Адрес проведения"
                            className="address-img"
                        />
                    </div>

                    {/* Кликабельная карта */}
                    <div className="map-block">
                        <a
                            href="https://yandex.by/maps/-/CPSqYX-G"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="map-link"
                        >
                            <div className="map-wrapper">
                                <iframe
                                    src="https://yandex.by/map-widget/v1/?ll=27.124638%2C53.740723&z=15&pt=27.124638,53.740723"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    title="Карта места проведения"
                                    className="location-map"
                                    loading="lazy"
                                ></iframe>

                                {/* Подсказка о кликабельности */}
                                <div className="map-hint">
                                    <span> Нажмите, чтобы открыть карту</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}