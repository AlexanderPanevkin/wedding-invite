import React, {useState} from 'react';
import './RSVP.scss';
import frameImg from '../../assets/RSVP.png.webp';
import rsvpTitle from "../../assets/rsvpTitle.png.webp";


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

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        if (name === 'alcohol') {
            handleAlcoholChange(value, (e.target as HTMLInputElement).checked);
        } else {
            setFormData(prev => ({...prev, [name]: value}));
        }
    };

    const handleAlcoholChange = (value: string, isChecked: boolean) => {
        setFormData(prev => {
            let newPrefs = [...prev.alcoholPreferences];
            if (isChecked) newPrefs.push(value);
            else newPrefs = newPrefs.filter(item => item !== value);
            return {...prev, alcoholPreferences: newPrefs};
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Данные:', formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({name: '', attendance: 'yes', alcoholPreferences: [], transfer: 'no', comments: ''});
        }, 5000);
    };

    if (isSubmitted) {
        return (
            <section className="rsvp-section">
                <div className="container">
                    <div className="rsvp-success">
                        <h2>Спасибо! 💖</h2>
                        <p>Мы получили ваш ответ!</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="rsvp-section">
            <div className="container">
                <div className="rsvp-title"><img
                    src={rsvpTitle}
                    alt="Анкета гостя"
                    className="rsvp-title-img"
                /></div>


                {/* 🔥 Обертка для рамки и формы */}
                <div className="rsvp-wrapper">

                    {/* Картинка-рамка (растягивается на весь блок) */}
                    <img src={frameImg} alt="" className="rsvp-frame"/>

                    {/* Форма лежит поверх рамки */}
                    <form onSubmit={handleSubmit} className="rsvp-form">

                        <div className="form-group">
                            <label>Имя и Фамилия *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                   placeholder="Иванов Иван"/>
                        </div>

                        <div className="form-group">
                            <label>Планируете ли быть? *</label>
                            <select name="attendance" value={formData.attendance} onChange={handleChange} required>
                                <option value="yes">С радостью! 🎉</option>
                                <option value="no">К сожалению, не смогу 😔</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Предпочтения по напиткам (можно выбрать несколько)</label>
                            <div className="alcohol-options">
                                {[
                                    {val: 'red-wine', icon: '🍷', label: 'Красное вино'},
                                    {val: 'white-wine', icon: '🥂', label: 'Белое вино'},
                                    {val: 'champagne', icon: '🍾', label: 'Шампанское'},
                                    {val: 'vodka', icon: '🧊', label: 'Водка'},
                                    {val: 'whiskey', icon: '🥃', label: 'Виски'},
                                    {val: 'cognac', icon: '🍸', label: 'Коньяк'},
                                    {val: 'beer', icon: '🍺', label: 'Пиво'},
                                    {val: 'non-alcoholic', icon: '🧃', label: 'Только сок'},
                                ].map((item) => (
                                    <label key={item.val}
                                           className={`alcohol-card ${formData.alcoholPreferences.includes(item.val) ? 'active' : ''}`}>
                                        <input type="checkbox" name="alcohol" value={item.val}
                                               checked={formData.alcoholPreferences.includes(item.val)}
                                               onChange={handleChange}/>
                                        <span className="alcohol-icon">{item.icon}</span>
                                        <span className="alcohol-name">{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Нужен ли трансфер?</label>
                            <div className="radio-group">
                                <label className="radio-label"><input type="radio" name="transfer" value="yesAll"
                                                                      checked={formData.transfer === 'yesAll'}
                                                                      onChange={handleChange}/> Туда и обратно</label>
                                <label className="radio-label"><input type="radio" name="transfer" value="yesOne"
                                                                      checked={formData.transfer === 'yesOne'}
                                                                      onChange={handleChange}/> Только туда</label>
                                <label className="radio-label"><input type="radio" name="transfer" value="yesTwo"
                                                                      checked={formData.transfer === 'yesTwo'}
                                                                      onChange={handleChange}/> Только обратно</label>
                                <label className="radio-label"><input type="radio" name="transfer" value="no"
                                                                      checked={formData.transfer === 'no'}
                                                                      onChange={handleChange}/> Не нужен</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Дополнительная информация</label>
                            <textarea name="comments"
                                      placeholder='Аллергии, пожелания по музыке, хочу/не хочу говорить тост и прочие пожелания🥳'
                                      value={formData.comments} onChange={handleChange} rows={3}></textarea>
                        </div>

                        <button type="submit" className="submit-btn">Отправить</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

// import React, { useState } from 'react';
// import './RSVP.scss';
// import frameImg from '../../assets/RSVP.png.webp';
// import rsvpTitle from "../../assets/rsvpTitle.png.webp";
//
// // 🔽 Импортируем иконки из react-icons
// // Используем набор Game Icons (gi) за их элегантный стиль
// import {
//     GiWineGlass,
//     GiBeerBottle ,
//     // GiCocktail,
//     GiBeerStein,
//     // GiJuice
// } from 'react-icons/gi';
// import { PiChampagne } from "react-icons/pi";
// import { LiaGlassWhiskeySolid } from "react-icons/lia";
// import { PiChampagneFill } from "react-icons/pi"
//
// interface FormData {
//     name: string;
//     attendance: string;
//     alcoholPreferences: string[];
//     transfer: string;
//     comments: string;
// }
//
// export const RSVP = () => {
//     const [formData, setFormData] = useState<FormData>({
//         name: '',
//         attendance: 'yes',
//         alcoholPreferences: [],
//         transfer: 'no',
//         comments: ''
//     });
//
//     const [isSubmitted, setIsSubmitted] = useState(false);
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//
//         if (name === 'alcohol') {
//             handleAlcoholChange(value, (e.target as HTMLInputElement).checked);
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };
//
//     const handleAlcoholChange = (value: string, isChecked: boolean) => {
//         setFormData(prev => {
//             let newPrefs = [...prev.alcoholPreferences];
//             if (isChecked) newPrefs.push(value);
//             else newPrefs = newPrefs.filter(item => item !== value);
//             return { ...prev, alcoholPreferences: newPrefs };
//         });
//     };
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log('Данные:', formData);
//         setIsSubmitted(true);
//         setTimeout(() => {
//             setIsSubmitted(false);
//             setFormData({ name: '', attendance: 'yes', alcoholPreferences: [], transfer: 'no', comments: '' });
//         }, 5000);
//     };
//
//     if (isSubmitted) {
//         return (
//             <section className="rsvp-section">
//                 <div className="container">
//                     <div className="rsvp-success">
//                         <h2>Спасибо! 💖</h2>
//                         <p>Мы получили ваш ответ!</p>
//                     </div>
//                 </div>
//             </section>
//         );
//     }
//
//     // 🔥 Массив с иконками-компонентами
//     const alcoholOptions = [
//         { val: 'red-wine', icon: <PiChampagneFill size={32} />, label: 'Красное вино' },
//         { val: 'white-wine', icon: <PiChampagne size={32} />, label: 'Белое вино' },
//         { val: 'champagne', icon: <GiWineGlass size={32} />, label: 'Шампанское' }, // Бутылка для шампанского
//         { val: 'vodka', icon: <GiBeerBottle  size={32} />, label: 'Водка' },       // Та же бутылка, но подпись "Водка"
//         { val: 'whiskey', icon: <LiaGlassWhiskeySolid size={32} />, label: 'Виски' },
//         { val: 'cognac', icon: <GiBeerBottle size={32} />, label: 'Коньяк' },   // Бокал на ножке
//         { val: 'beer', icon: <GiBeerStein size={32} />, label: 'Пиво' },
//         { val: 'non-alcoholic', icon: <GiBeerBottle size={32} />, label: 'Только сок' },
//     ];
//
//     return (
//         <section className="rsvp-section">
//             <div className="container">
//                 <div className="rsvp-title">
//                     <img
//                         src={rsvpTitle}
//                         alt="Анкета гостя"
//                         className="rsvp-title-img"
//                     />
//                 </div>
//
//                 {/* 🔥 Обертка для рамки и формы */}
//                 <div className="rsvp-wrapper">
//
//                     {/* Картинка-рамка */}
//                     <img src={frameImg} alt="" className="rsvp-frame" />
//
//                     {/* Форма лежит поверх рамки */}
//                     <form onSubmit={handleSubmit} className="rsvp-form">
//
//                         <div className="form-group">
//                             <label>Имя и Фамилия *</label>
//                             <input type="text" name="name" value={formData.name} onChange={handleChange} required
//                                    placeholder="Иванов Иван" />
//                         </div>
//
//                         <div className="form-group">
//                             <label>Планируете ли быть? *</label>
//                             <select name="attendance" value={formData.attendance} onChange={handleChange} required>
//                                 <option value="yes">С радостью! 🎉</option>
//                                 <option value="no">К сожалению, не смогу 😔</option>
//                             </select>
//                         </div>
//
//                         <div className="form-group">
//                             <label>Предпочтения по напиткам (можно выбрать несколько)</label>
//                             <div className="alcohol-options">
//                                 {alcoholOptions.map((item) => (
//                                     <label key={item.val}
//                                            className={`alcohol-card ${formData.alcoholPreferences.includes(item.val) ? 'active' : ''}`}>
//                                         <input type="checkbox" name="alcohol" value={item.val}
//                                                checked={formData.alcoholPreferences.includes(item.val)}
//                                                onChange={handleChange} />
//
//                                         {/* 🔥 Выводим иконку как React-компонент */}
//                                         <span className="alcohol-icon">{item.icon}</span>
//
//                                         <span className="alcohol-name">{item.label}</span>
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//
//                         <div className="form-group">
//                             <label>Нужен ли трансфер?</label>
//                             <div className="radio-group">
//                                 <label className="radio-label"><input type="radio" name="transfer" value="yesAll"
//                                                                       checked={formData.transfer === 'yesAll'}
//                                                                       onChange={handleChange} /> Туда и обратно</label>
//                                 <label className="radio-label"><input type="radio" name="transfer" value="yesOne"
//                                                                       checked={formData.transfer === 'yesOne'}
//                                                                       onChange={handleChange} /> Только туда</label>
//                                 <label className="radio-label"><input type="radio" name="transfer" value="yesTwo"
//                                                                       checked={formData.transfer === 'yesTwo'}
//                                                                       onChange={handleChange} /> Только обратно</label>
//                                 <label className="radio-label"><input type="radio" name="transfer" value="no"
//                                                                       checked={formData.transfer === 'no'}
//                                                                       onChange={handleChange} /> Не нужен</label>
//                             </div>
//                         </div>
//
//                         <div className="form-group">
//                             <label>Дополнительная информация</label>
//                             <textarea name="comments"
//                                       placeholder='Аллергии, пожелания по музыке, хочу/не хочу говорить тост и прочие пожелания🥳'
//                                       value={formData.comments} onChange={handleChange} rows={3}></textarea>
//                         </div>
//
//                         <button type="submit" className="submit-btn">Отправить</button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };