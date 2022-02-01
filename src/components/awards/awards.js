import { React, useState, useEffect } from "react";
import Award from "./award";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";


const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    color : "white", 
    width: "500px",
    textAlign: "center",
    fontSize: "2rem"
  }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      backgroundColor: "transparent",
      color: "black",
      cursor : "default"
    };
  },
};

const Awards = (props) => {
  const [awards, setAwards] = useState(null);
  const [startYearOption, setStartYearOption] = useState(1901);
  const [startDateOption, setStartDateOption] = useState(new Date("2018"));
  const [categoryOption, setCategoryOption] = useState([]);

  const categoryOptions = [
    { value: "chemistry", label: "Chemistry" },
    { value: "economics", label: "Economics" },
    { value: "literature", label: "Literature" },
    { value: "peace", label: "Peace" },
    { value: "physics", label: "Physics" },
    { value: "medicine", label: "Medicince" },
    { value: "all", label :"All"}
  ];

  useEffect(() => {
    async function getData() {
      const response = await fetch("https://api.nobelprize.org/v1/prize.json");
      const data = await response.json();
      setAwards(data.prizes);
    }
    getData();
  }, []);

  const handleChange = (e) => {
      if(e.value === "all"){
          setCategoryOption([]);
      }else{
    setCategoryOption(e.value);
      }
    console.log(categoryOption);
  };

  const customFilter = (awards, startYear = 1901, categories) => {
    let filteredItems = [];
    awards.forEach((award) => {
      if (categories.length > 0) {
        if (
          parseInt(award.year) === startYear &&
          categories.includes(award.category)
        ) {
          filteredItems.push(award);
        }
      } else {
        if (parseInt(award.year) === startYear) {
          filteredItems.push(award);
        }
      }
    });
    return filteredItems;
  };

  return (
    <div className="awards-wrapper-div glow">
      <div className="filtersDiv">
        <DatePicker
          wrapperClassName="datepicker-wrapper"
          selected={startDateOption}
          startDate={startYearOption}
          onChange={(date) => {
            setStartYearOption(parseInt(date.getFullYear()));
            setStartDateOption(date);
            // setEndYearOption(parseInt(date.getFullYear()));
          }}
          placeholderText={"Select or Enter year"}
          showYearPicker
          popperPlacement="bottom"
          dateFormat="yyyy"
          minDate={new Date("1901")}
          maxDate={new Date("2018")}
        />
        <Select
          options={categoryOptions}
          onChange={handleChange}
          styles={colourStyles}
          wrapperClassName="select-wrapper"
          placeholder="Select Category"
        />
      </div>

      <table>
        {awards && (
          <>
            <Award
              awards={customFilter(awards, startYearOption, categoryOption)}
            />
          </>
        )}
      </table>
    </div>
  );
};

export default Awards;
