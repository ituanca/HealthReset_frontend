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
import SpecialistActions from "./components/specialist/SpecialistActions";
import EditProfile from "./components/regularUser/EditProfile";
import TrackActivity from "./components/regularUser/TrackActivity";
import AddPhysicalExercise from "./components/admin/AddPhysicalExercise";
import AddRoutineFitnessProgram from "./components/specialist/AddRoutineFitnessProgram";
import AddRoutineMealPlan from "./components/specialist/AddRoutineMealPlan";
import AddRoutineDescription from "./components/specialist/AddRoutineDescription";
import ManageRoutines from "./components/admin/ManageRoutines";
import SearchForRoutines from "./components/regularUser/SearchForRoutines";


const rootElement = document.getElementById("root");

render(

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />

            <Route path="/LogInRegularUser" element={<LogInRegularUser />} />
            <Route path="/SignUpRegularUser" element={<SignUpRegularUser />} />
            <Route path="/RegularUserActions" element={<RegularUserActions />} />
            <Route path="/CreateProfile" element={<CreateProfile />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/TrackActivity" element={<TrackActivity />} />
            <Route path="/SearchForRoutines" element={<SearchForRoutines />} />

            <Route path="/LogInSpecialist" element={<LogInSpecialist />} />
            <Route path="/SignUpSpecialist" element={<SignUpSpecialist />} />
            <Route path="/SpecialistActions" element={<SpecialistActions />} />
            <Route path="/AddRoutineFitnessProgram" element={<AddRoutineFitnessProgram />} />
            <Route path="/AddRoutineMealPlan" element={<AddRoutineMealPlan />} />
            <Route path="/AddRoutineDescription" element={<AddRoutineDescription />} />

            <Route path="/LogInAdmin" element={<LogInAdmin />} />
            <Route path="/SignUpAdmin" element={<SignUpAdmin />} />
            <Route path="/AdminActions" element={<AdminActions />} />
            <Route path="/AddPrimaryFood" element={<AddPrimaryFood />} />
            <Route path="/AddPhysicalExercise" element={<AddPhysicalExercise/>} />
            <Route path="/ManageRoutines" element={<ManageRoutines/>} />

        </Routes>
    </BrowserRouter>,
    rootElement
);

reportWebVitals();
