import React, { useState } from 'react';
import './RSVP.scss';
import frameImg from '../../assets/RSVP.png.webp';
import rsvpTitle from "../../assets/rsvpTitle.png.webp";

import { GiBeerBottle, GiBeerStein, GiBrandyBottle, GiWaterBottle } from 'react-icons/gi';
import { PiChampagne, PiWineFill, PiWineLight } from "react-icons/pi";
import { LiaGlassWhiskeySolid } from "react-icons/lia";

const FORMSPREE_URL = "https://formspree.io/f/mgodwjdo";

interface FormData {
    name: string;
    attendance: string;
    alcoholPreferences: string[];
    transfer: string;
    comments: string;
}

export const RSVP = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        attendance: 'yes',
        alcoholPreferences: [],
        transfer: 'no',
        comments: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Состояния для ошибок валидации
    const [showDrinkError, setShowDrinkError] = useState(false);
    const [showNameError, setShowNameError] = useState(false);
    const [showCommentsError, setShowCommentsError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'alcohol') {
            handleAlcoholChange(value, (e.target as HTMLInputElement).checked);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));

            // Снимаем ошибки при начале ввода
            if (name === 'name') setShowNameError(false);
            if (name === 'comments') setShowCommentsError(false);
        }
    };

    const handleAlcoholChange = (value: string, isChecked: boolean) => {
        setFormData(prev => {
            let newPrefs = [...prev.alcoholPreferences];
            if (isChecked) newPrefs.push(value);
            else newPrefs = newPrefs.filter(item => item !== value);

            // Снимаем ошибку напитков при выборе
            if (showDrinkError && newPrefs.length > 0) setShowDrinkError(false);

            return { ...prev, alcoholPreferences: newPrefs };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 🔥 БЛОКИРУЕМ СКРОЛЛ СРАЗУ ПРИ НАЖАТИИ КНОПКИ
        document.body.classList.add('no-scroll');

        let hasError = false;

        // 1. Проверка Имени
        if (!formData.name.trim()) {
            setShowNameError(true);
            hasError = true;
        }

        // 2. Проверка Напитков
        if (formData.alcoholPreferences.length === 0) {
            setShowDrinkError(true);
            hasError = true;
        }

        // 3. Проверка Комментариев
        if (!formData.comments.trim()) {
            setShowCommentsError(true);
            hasError = true;
        }

        if (hasError) {
            // Если есть ошибки, РАЗБЛОКИРУЕМ скролл обратно, чтобы пользователь мог исправить
            document.body.classList.remove('no-scroll');

            // Плавный скролл к первой ошибке
            const firstError = document.querySelector('.field-error-msg');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setStatus('submitting');

        try {
            const drinkLabels: Record<string, string> = {
                'red-wine': 'Красное вино',
                'white-wine': 'Белое вино',
                'champagne': 'Шампанское',
                'vodka': 'Водка',
                'whiskey': 'Виски',
                'cognac': 'Коньяк',
                'beer': 'Пиво',
                'non-alcoholic': 'Б/А напитки'
            };

            const dataToSend = {
                "Имя гостя": formData.name,
                "Присутствие": formData.attendance === 'yes' ? 'Будет' : 'Не будет',
                "Напитки": formData.alcoholPreferences
                    .map(val => drinkLabels[val] || val)
                    .join(', '),
                "Трансфер": formData.transfer === 'yesAll' ? 'Туда и обратно' :
                    formData.transfer === 'yesOne' ? 'Только туда' :
                        formData.transfer === 'yesTwo' ? 'Только обратно' : 'Не нужен',
                "Комментарии": formData.comments
            };

            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                setStatus('success');
                // Очищаем форму
                setFormData({
                    name: '',
                    attendance: 'yes',
                    alcoholPreferences: [],
                    transfer: 'no',
                    comments: ''
                });
                setShowNameError(false);
                setShowDrinkError(false);
                setShowCommentsError(false);
            } else {
                setStatus('error');
                // В случае ошибки сервера тоже можно разблокировать скролл, если нужно
                // document.body.classList.remove('no-scroll');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    // Функция возврата к форме
    const handleReturnToForm = () => {
        setStatus('idle');
        document.body.classList.remove('no-scroll');
    };

    const alcoholOptions = [
        { val: 'red-wine', icon: <PiWineFill size={32} />, label: 'Красное вино' },
        { val: 'white-wine', icon: <PiWineLight size={32} />, label: 'Белое вино' },
        { val: 'champagne', icon: <PiChampagne size={32} />, label: 'Шампанское' },
        { val: 'vodka', icon: <GiBeerBottle size={32} />, label: 'Водка' },
        { val: 'whiskey', icon: <LiaGlassWhiskeySolid size={32} />, label: 'Виски' },
        { val: 'cognac', icon: <GiBrandyBottle size={32} />, label: 'Коньяк' },
        { val: 'beer', icon: <GiBeerStein size={32} />, label: 'Пиво' },
        { val: 'non-alcoholic', icon: <GiWaterBottle size={32} />, label: 'Сок(вода)' },
    ];

    return (
        <section className="rsvp-section">

            {/* 🔥 Обертка контента вынесена НА УРОВЕНЬ SECTION */}
            <div className={`rsvp-content-wrapper ${status === 'success' ? 'blurred' : ''}`}>
                <div className="container">
                    <div className="rsvp-title">
                        <img src={rsvpTitle} alt="Анкета гостя" className="rsvp-title-img" />
                    </div>

                    <div className="rsvp-wrapper">
                        <img src={frameImg} alt="" className="rsvp-frame" />

                        <form onSubmit={handleSubmit} className="rsvp-form">
                            <fieldset disabled={status === 'submitting' || status === 'success'} style={{ border: 'none', padding: 0, opacity: (status === 'submitting' || status === 'success') ? 0.7 : 1 }}>

                                <div className="form-group">
                                    <label className={showNameError ? 'label-error' : ''}>Ваше имя и фамилия *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Иванов Иван"
                                    />
                                    {showNameError && (
                                        <div className="field-error-msg">
                                            Пожалуйста, введите ваше имя
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Планируете ли вы присутствовать?</label>
                                    <div className="radio-options">
                                        <label className={`radio-option ${formData.attendance === 'yes' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="attendance"
                                                value="yes"
                                                checked={formData.attendance === 'yes'}
                                                onChange={handleChange}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-text">С радостью приду!</span>
                                        </label>

                                        <label className={`radio-option ${formData.attendance === 'no' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="attendance"
                                                value="no"
                                                checked={formData.attendance === 'no'}
                                                onChange={handleChange}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-text">К сожалению, не смогу</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className={showDrinkError ? 'label-error' : ''}>Предпочтения по напиткам *</label>

                                    <div className={`alcohol-options ${showDrinkError ? 'options-error' : ''}`}>
                                        {alcoholOptions.map((item) => (
                                            <label key={item.val} className={`alcohol-card ${formData.alcoholPreferences.includes(item.val) ? 'active' : ''}`}>
                                                <input type="checkbox" name="alcohol" value={item.val} checked={formData.alcoholPreferences.includes(item.val)} onChange={handleChange} />
                                                <span className="alcohol-icon">{item.icon}</span>
                                                <span className="alcohol-name">{item.label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {showDrinkError && (
                                        <div className="field-error-msg">
                                            Пожалуйста, выберите хотя бы один напиток
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Нужен ли трансфер?</label>
                                    <div className="radio-options transfer-options">
                                        <label className={`radio-option ${formData.transfer === 'yesAll' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="transfer"
                                                value="yesAll"
                                                checked={formData.transfer === 'yesAll'}
                                                onChange={handleChange}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-text">Да, туда и обратно</span>
                                        </label>

                                        <label className={`radio-option ${formData.transfer === 'yesOne' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="transfer"
                                                value="yesOne"
                                                checked={formData.transfer === 'yesOne'}
                                                onChange={handleChange}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-text">Да, только туда</span>
                                        </label>

                                        <label className={`radio-option ${formData.transfer === 'yesTwo' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="transfer"
                                                value="yesTwo"
                                                checked={formData.transfer === 'yesTwo'}
                                                onChange={handleChange}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-text">Да, только обратно</span>
                                        </label>

                                        <label className={`radio-option ${formData.transfer === 'no' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="transfer"
                                                value="no"
                                                checked={formData.transfer === 'no'}
                                                onChange={handleChange}
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-text">Не нужен</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className={showCommentsError ? 'label-error' : ''}>Дополнительная информация *</label>
                                    <textarea
                                        name="comments"
                                        placeholder='Аллергии, хочу/не хочу говорить тост, прочие пожелания'
                                        value={formData.comments}
                                        onChange={handleChange}
                                        rows={3}
                                    ></textarea>
                                    {showCommentsError && (
                                        <div className="field-error-msg">
                                            Пожалуйста, заполните это поле
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className="submit-btn" disabled={status === 'submitting' || status === 'success'}>
                                    {status === 'submitting' ? 'Отправка...' : 'Отправить'}
                                </button>

                                {status === 'error' && <p className="error-msg">Ошибка отправки. Попробуйте позже.</p>}
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>

            {/* 🔥 Модальное окно успеха */}
            {status === 'success' && (
                <div className="success-overlay">
                    <div className="success-modal">
                        <h2>Grazie!</h2>
                        <p>Ваш ответ на приглашение отправлен нам на почтовый ящик.<br />Мы с нетерпением ждем встречи!</p>
                        <button onClick={handleReturnToForm} className="submit-btn">
                            Вернуться к анкете
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};