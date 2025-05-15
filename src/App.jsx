import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Overview from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Team from './pages/Team';
import Login from './pages/Login'; // Import your Login component
import Messageone from './pages/Messageone';
import DoctorAll from './pages/doctorall';
import SingleDoctor from './pages/SingleDoctor';
import PatientAll from './pages/Patientall';
import SinglePatient from './pages/SinglePatient';
import MedicineAll from './pages/MedicineAll';
import SingleMedicine from './pages/SingleMedicine';
import RoomAll from './pages/RoomAll';
import MedicineAdditionPanel from './pages/MedicineAdditonPanel';
import BillComp from './pages/BillComp';
import Articles from './pages/Articles';
import LoginOrRegisterDoctor from './pages/LoginOrRegisterDoctor';
import RegisterPatient from './pages/RegisterPatient';
import SingleRoomChange from './pages/SingleRoomChange';
import CreateMedicine from './pages/CreateMedicine';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registerpatient" element={<RegisterPatient />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="*"
          element={
            <>
              <Sidebar />
              <Routes>
                <Route path="/overview" element={<Overview />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/reports1" element={<ReportsOne />} />
                <Route path="/getalldoctor" element={<DoctorAll />} />
                <Route path="/doctor/:id" element={<SingleDoctor/>} />
                <Route path="/patient/:id" element={<SinglePatient/>} />
                <Route path="/medicines/:id" element={<SingleMedicine/>} />
                <Route path="/articles" element={<Articles/>} />
               <Route path="/registerorlogindoctor" element={<LoginOrRegisterDoctor/>}/>
               <Route path="/medicine/all" element = {<MedicineAll />} />
               <Route path="/rooms/all" element = {<RoomAll />} />
               <Route path="/rooms/:id" element = {<SingleRoomChange />} />
                <Route path='/addmedicine' element = {<CreateMedicine />} />
                <Route path="/selectmedicine/fordiagnosis/:diagnosisId/:patientId" element={<MedicineAdditionPanel />} />
                 <Route path="/paybill/:diagnosisId/:patientId" element={<BillComp />} />
                <Route path="/getallpatient" element={<PatientAll />} />
                <Route path="/reports/reports2" element={<ReportsTwo />} />
                <Route path="/reports/reports3" element={<ReportsThree />} />
                <Route path="/message1" element={<Messageone />} />
                <Route path="/team" element={<Team />} />
                <Route path="*" element={<Navigate to="/overview" />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
