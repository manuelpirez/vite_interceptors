import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from "./store.js"

import './index.css';
import App from './App.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
                <BrowserRouter>
                        <Routes>
                                <Route path="/*" element={<App />} />
                        </Routes>
                </BrowserRouter>
        </Provider>
);