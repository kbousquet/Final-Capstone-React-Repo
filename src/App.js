import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Landing_Page from './Landing_Page/Landing_Page';

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Landing_Page/>}/>
                </Routes>
                    
            </BrowserRouter>
        </>
    );
}

export default App;
