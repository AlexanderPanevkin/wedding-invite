import './App.scss'
import {Hero} from './components/Hero/Hero.tsx';
import {Calendar} from './components/Calendar/Calendar';
import {Timing} from './components/Timing/Timing';
import {Location} from './components/Location/Location';
import {Details} from './components/Details/Details';
import {RSVP} from './components/RSVP/RSVP';
import {Footer} from './components/Footer/Footer';

function App() {
    return (
        <main className="app">
            <Hero/>
            <div className="timing">
                <Calendar/>
                <Timing/>
            </div>
            <Location/>
            <Details/>
            <RSVP/>
            <Footer/>
        </main>
    );
}


export default App;