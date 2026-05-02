import './App.scss'
import {Hero} from './components/Hero/Hero.tsx';
import {Calendar} from './components/Calendar/Calendar';
import {Timing} from './components/Timing/Timing';
import {Location} from './components/Location/Location';
import {Details} from './components/Details/Details';
import {RSVP} from './components/RSVP/RSVP';
import {Footer} from './components/Footer/Footer';
import {Countdown} from "./components/Countdown/Countdown.tsx";
import {Welcome} from './components/Welcome/Welcome';

function App() {
    return (
        <>
            <Welcome />
            <main className="app">
                <Hero/>
                <div className="timing">
                    <Calendar/>
                    <Timing/>
                </div>
                <Location/>
                <Details/>
                <RSVP/>
                <Countdown/>
                <Footer/>
            </main>
        </>
    );
}


export default App;