import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {render} from "react-dom";
import LogInAdmin from "./components/admin/LogInAdmin";
import SignUpAdmin from "./components/admin/SignUpAdmin";
import AdminActions from "./components/admin/AdminActions";
import AddPrimaryFood from "./components/admin/AddPrimaryFood";
import LogInRegularUser from "./components/regularUser/LogInRegularUser";
import SignUpRegularUser from "./components/regularUser/SignUpRegularUser";
import CreateProfile from "./components/regularUser/CreateProfile";
import RegularUserActions from "./components/regularUser/RegularUserActions";
import LogInSpecialist from "./components/specialist/LogInSpecialist";
import SignUpSpecialist from "./components/specialist/SignUpSpecialist";

const rootElement = document.getElementById("root");

render(

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />

            <Route path="/LogInRegularUser" element={<LogInRegularUser />} />
            <Route path="/SignUpRegularUser" element={<SignUpRegularUser />} />
            <Route path="/RegularUserActions" element={<RegularUserActions />} />
            <Route path="/CreateProfile" element={<CreateProfile />} />

            <Route path="/LogInSpecialist" element={<LogInSpecialist />} />
            <Route path="/SignUpSpecialist" element={<SignUpSpecialist />} />

            <Route path="/LogInAdmin" element={<LogInAdmin />} />
            <Route path="/SignUpAdmin" element={<SignUpAdmin />} />
            <Route path="/AdminActions" element={<AdminActions />} />
            <Route path="/AddPrimaryFood" element={<AddPrimaryFood />} />

        </Routes>
    </BrowserRouter>,
    rootElement
);

reportWebVitals();
