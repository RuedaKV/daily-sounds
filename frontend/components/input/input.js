import React from "react";
import "./input.css";
import { useState } from "react";

export const Input = () => {
  const updateStyle = () => {
    document.querySelector(".div-form").hide();
  };

  const [dayState, setDay] = useState("01");
  const [monthState, setMonth] = useState("January");
  const token = window.location.hash;

  return (
    <div>
      <div class="div-loading hidden">
        <h1>Loading...</h1>
      </div>
      <div class="div-form">
        <h1 class="date-header">Enter a Date</h1>
        <form role="form" method="POST" action="/api" role="form">
          <input class="token-form" name="token" value={token}></input>

          <div class="date-fields">
            <select
              class="month select-field"
              id="month"
              name="month"
              onChange={(e) => {
                const selectedMonth = e.target.value;
                setMonth(selectedMonth);
              }}
            >
              <option value="January">January</option>
              <option value="Febuary">Febuary</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select
              class="day select-field"
              id="day"
              name="day"
              onChange={(e) => {
                const selectedDay = e.target.value;
                setDay(selectedDay);
              }}
            >
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
          <div class="submit-container">
            <button
              class="submit-button"
              type="submit"
              id="submit-button"
              onClick={updateStyle}
            >
              Find Songs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
