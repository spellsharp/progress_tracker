import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DynamicChart from "./chart_cgpa";
import "../App.css";
import SelectStudent from "./Select.js";

function GPA() {
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/logout/", {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  const [rollNum, setRollNum] = useState("");
  const [semesterNum, setSemesterNum] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showError, setShowError] = useState(false);
  const [matchError, setMatchError] = useState(false);
  const [chartType, setChartType] = useState("LineChart");
  
  const handleStudentSelect = (selectedOption) => {
    setRollNum(selectedOption);
  };

  const handleStudentSearch = async (e) => {
    e.preventDefault();
    if (!rollNum) {
      setShowError(true);
      return;
    }
    try {
      const semesterNums = semesterNum.split(",");
      const response = await fetch(
        `http://localhost:8000/api/searchSem/?rollNum=${rollNum}&semesterNum=${semesterNums.join(
          ","
        )}`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowError(false);
      console.log(data);
      data.length === 0 ? setMatchError(true) : setMatchError(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChartTypeChange = async (e) => {
    setChartType(e.target.value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="addStudents"
    >
      <div
        className="getDetailsForm"
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <form
          style={{
            position: "absolute",
            width: "350px",
            // top: "301px",
            height: "500px",
          }}
          onSubmit={handleStudentSearch}
        >
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0%",
              right: "0%",
              bottom: "0%",
              left: "0%",
              borderRadius: "20px",
              backgroundColor: "#fff",
            }}
          />
          <div
            style={{
              position: "absolute",
              height: "11.86%",
              width: "50.87%",
              top: "53.83%",
              left: "12.14%",
              fontSize: "18px",
              color: "#000",
              textAlign: "left",
              display: "inline-block",
            }}
          >
            Semester Number
          </div>
          <b
            style={{
              position: "absolute",
              height: "8.69%",
              width: "45.38%",
              top: "7.63%",
              left: "27.46%",
              fontSize: "30px",
              display: "inline-block",
              color: "#000",
              textAlign: "left",
            }}
          >
            ACADEMIZE
          </b>
          {/* <input
            style={{
              border: "none",
              backgroundColor: "#fff",
              position: "absolute",
              height: "9.53%",
              width: "79.77%",
              top: "40%",
              right: "9.25%",
              bottom: "40.47%",
              left: "10.98%",
              borderRadius: "100px",
              padding: "15px",
              border: "thin solid grey",
            }}
            type="text"
            placeholder="Roll Number"
            value={rollNum}
            onChange={(e) => setRollNum(e.target.value)}
          /> */}
          <div
            style={{
              backgroundColor: "#fff",
              position: "absolute",
              height: "9.53%",
              width: "79.77%",
              top: "40%",
              right: "9.25%",
              bottom: "40.47%",
              left: "10.98%",
              borderRadius: "100px",
            }}
          >
            <SelectStudent onValueChange={handleStudentSelect}/>
          </div>
          <div
            style={{
              position: "absolute",
              width: "34.1%",
              top: "34.22%",
              left: "12.14%",
              fontSize: "18px",
              color: "#000",
              textAlign: "left",
              display: "inline-block",
            }}
          >
            Roll Number
          </div>
          <input
            style={{
              border: "none",
              backgroundColor: "#fff",
              position: "absolute",
              height: "9.53%",
              width: "79.77%",
              top: "60.03%",
              right: "9.25%",
              bottom: "18.43%",
              left: "10.98%",
              borderRadius: "100px",
              padding: "15px",
              border: "thin solid grey",
            }}
            type="text"
            placeholder="Semesters (comma-seperated)"
            value={semesterNum}
            onChange={(e) => setSemesterNum(e.target.value)}
          />
          <div
            style={{
              position: "absolute",
              height: "6.78%",
              width: "30.64%",
              top: "85.59%",
              right: "36.99%",
              bottom: "7.63%",
              left: "32.37%",
              // backgroundColor: "#fff",
            }}
          />
          <button
            className="whitebutton"
            style={{
              cursor: "pointer",
              padding: "0",
              position: "absolute",
              height: "40px",
              width: "100px",
              top: "90.59%",
              right: "36.99%",
              bottom: "7.63%",
              borderRadius: "100px",
            }}
          >
            Search
          </button>
          <a
            href="/marks"
            style={{
              position: "absolute",
              top: "93%",
              right: "0",
              marginRight: "10px",
              bottom: "5%",
              fontSize: "15px",
              color: "black",
            }}
          >
            View Marks <span style={{ fontSize: "20px" }}>&#8594;</span>
          </a>
          {showError && (
            <p
              style={{
                color: "red",
                position: "absolute",
                top: "87.5%",
                left: "35%",
              }}
            >
              Please enter a search term
            </p>
          )}
          {matchError && (
            <p style={{ color: "red", marginLeft: "30px" }}>
              No results found!
            </p>
          )}

          <b
            style={{
              position: "absolute",
              top: "22.25%",
              left: "30%",
              fontSize: "25px",
              color: "#000",
              textAlign: "left",
            }}
          >
            Analyze GPA
          </b>
          <div
            style={{
              position: "absolute",
              height: "40px",
              width: "200px",
              top: "72.59%",
              right: "36.99%",
              bottom: "7.63%",
              left: "12.14%",
            }}
          >
            <label
              style={{ fontSize: "18px", fontWeight: "400" }}
              htmlFor="chartType"
            >
              Select a Chart Type
            </label>
            <select
              style={{
                width: "138%",
                borderRadius: "100px",
                padding: "10px",
                backgroundColor: "white",
                color: "grey",
                outline: "none",
                fontSize: "14px",
                fontWeight: "400",
              }}
              id="chartType"
              name="chartType"
              onChange={handleChartTypeChange}
            >
              <option value="LineChart">Line Chart</option>
              <option value="BarChart">Bar Chart</option>
              <option value="PieChart">Pie Chart</option>
              <option value="ScatterChart">Scatter Chart</option>
              <option value="AreaChart">Area Chart</option>
            </select>
          </div>
        </form>
      </div>

      <div
        className="dataChart"
        style={{ marginTop: "30%", display: "flex", justifyContent: "center" }}
      >
        {searchResults.length > 0 && (
          <div className="dataDisplay">
            {searchResults.length > 0 && (
              <div style={{ padding: "1%" }}>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "750",
                    textAlign: "start",
                  }}
                >
                  {searchResults[0].student__name}
                </p>
                <br />
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    textAlign: "start",
                  }}
                >
                  Roll Number: {searchResults[0].student__roll_num}
                </p>
                <br />
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    textAlign: "start",
                  }}
                >
                  Phone: {searchResults[0].student__phone_number}
                </p>
                <br />
              </div>
            )}
            {searchResults.map((item, index) => (
              <div key={index}>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    textAlign: "start",
                  }}
                >
                  SGPA-{item.semester_num}: {item.cgpa}
                </p>
              </div>
            ))}
          </div>
        )}
        {<div style={{ opacity: "0" }}>................</div>}
        {searchResults.length > 0 && (
          <DynamicChart
            chartType={chartType}
            data={searchResults.map((item) => ({
              name: `SGPA-${item.semester_num}`,
              value: item.cgpa,
            }))}
          />
        )}
      </div>
    </div>
  );
}

export default GPA;
