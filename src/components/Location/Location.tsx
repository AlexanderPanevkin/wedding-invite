import placeText from "../../assets/placeText.png.webp";
import address from "../../assets/address.png.webp";
import './Location.scss';

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

                    {/* Карта и кнопка внутри одного контекста */}
                    <div className="map-block">
                        <div className="map-wrapper">
                            <iframe
                                src="https://yandex.by/map-widget/v1/?ll=27.124638%2C53.740723&z=15&pt=27.124638,53.740723"
                                width="100%"
                                height="100%"
                                allowFullScreen={true}
                                title="Карта места проведения"
                                className="location-map"
                                loading="lazy"
                            ></iframe>

                          //  <a
                                href="https://yandex.by/maps/-/CPSqYX-G"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="map-nav-btn"
                            >
                                Нажмите чтобы открыть карту
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}