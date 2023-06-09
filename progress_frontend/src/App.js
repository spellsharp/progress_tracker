import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GPA from './components/GPA';
import Home from './components/Home';
import Login from './components/login';
import Marks from './components/Marks';
import AddFile from './components/AddFile';
import { AuthProvider } from './components/AuthContext';
import Register from './components/register';
import { Logout } from './components/logout';
import AddStudents from './components/AddStudents';
const App = () => {
  return (
    <>
    <div className="App">
        <Router>
          <AuthProvider>
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/' element={
            <>
            <Navbar />
            <Home />
            </>
            }/>

            <Route path='/student' element={
            <>
            <Navbar />
            <GPA />
            </>
            }/>

            <Route path='/marks' element={
            <>
            <Navbar />
            <Marks />
            </>
            }/>

            <Route path='/add' element={
            <>
            <Navbar />
            <AddFile />
            </>
            }/>

            <Route path='/addStudents' element={
            <>
            <Navbar />
            <AddStudents />
            </>
            }/>

          </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
};
  
export default App;