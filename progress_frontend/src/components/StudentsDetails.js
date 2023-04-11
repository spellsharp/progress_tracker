import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DynamicChart from "./chart_cgpa";

function StudentDetails() {
  useEffect(() => {
    if(localStorage.getItem('access_token') === null){
      window.location.href= '/'
    }
    else{
      (async () => {
        try{
          const {data} = await axios.get('http://localhost:8000/logout/', {
            headers: {
              'Content-Type': 'application/json',
            }
          }
          );
          console.log(data)

          }catch(e) {
            console.log(e)
          }
        })()};
      }, []);

  const [rollNum, setRollNum] = useState("");
  const [semesterNum, setSemesterNum] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showError, setShowError] = useState(false);
  const [matchError, setMatchError] = useState(false);
  // const [showAddStudent, setShowAddStudent] = useState(false);

  const handleStudentSearch = async (e) => {
    e.preventDefault();
    if (!rollNum) {
      setShowError(true);
      return;
    }
    try {
      const semesterNums = semesterNum.split(",");
      const response = await fetch(`http://localhost:8000/api/search/?rollNum=${rollNum}&semesterNum=${semesterNums.join(",")}`);
      const data = await response.json();
      setSearchResults(data);
      setShowError(false);
      console.log(data);
      data.length === 0 ? setMatchError(true) : setMatchError(false);
    } catch (error) {
      console.error(error);
    }

  };
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', fontSize:'14px'}}>
      <div style={{background:'grey', borderRadius:'10px', padding:'40px', marginTop:'50px', background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(70,70,70,1) 54%, rgba(112,112,112,1) 72%, rgba(0,0,0,1) 100%)'}}>
      <h1 style={{color:'white'}}>Student Details</h1>
      <br />
      <br />
      <form style={{flex:'column', width:'100%'}} onSubmit={handleStudentSearch}>
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNum}
          onChange={(e) => setRollNum(e.target.value)}
          style={{borderRadius:'10px', height:'40px', background:'lightGrey', paddingLeft:'5px'}}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Semesters (comma-seperated)"
          value={semesterNum}
          onChange={(e) => setSemesterNum(e.target.value)}
          style={{borderRadius:'10px', height:'40px', background:'lightGrey', paddingLeft:'5px'}}
        />
        <br />
        <br />
        <button style={{marginLeft:'10px', background:'lightGrey', borderRadius:'10px', fontSize:'12px', padding:'3px', borderColor:'darkgrey'}} type="submit">Search</button>
        {showError && (
          <p style={{ color: "red" }}>Please enter a search term</p>
        )}
        {matchError && (
          <p style={{ color: "red", marginLeft:'30px'}}>No results found!</p>
        )}


      </form>
      </div>
      <div style={{margin:'25px', padding:'30px', background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(70,70,70,1) 69%, rgba(107,108,108,1) 100%)', borderRadius:'10px'}}>
      {searchResults.length > 0 &&
      <div style={{color:'white', padding:'1%'}}>
        <p style={{fontSize:'32px', fontWeight:'750', textAlign:'start'}}>{searchResults[0].student__name}</p>
        <p style={{fontSize:'20px', fontWeight:'500', textAlign:'start'}}>Roll Number: {searchResults[0].student__roll_num}</p>
        <p style={{fontSize:'20px', fontWeight:'500', textAlign:'start'}}>Phone: {searchResults[0].student__phone_number}</p>
        <br />
      </div>
      }
      {searchResults.map((item, index) => (
      <div key={index} style={{color:'white'}}>
        <p style={{fontSize:'18px', fontWeight:'400', textAlign:'start'}}>SGPA{item.semester_num}: {item.cgpa}</p>
      </div>
    ))}
    </div>
    <DynamicChart data={searchResults.map(item => ({ name: `SGPA${item.semester_num}`, value: item.cgpa }))} />
    </div>

  );
}

export default StudentDetails;