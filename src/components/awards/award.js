import { React, useState, useEffect } from "react";

const Award = (props) => {
// console.log(props.awards);
return (

    <>
      {props.awards && (
        <>
          {props.awards.map((award, index) => {
            if ("laureates" in award) {
              return [
                <tr className="tableTR" key={index}>
                  <td className="award-category">{award.category}</td>
                  <td className="laur">
                  {award.laureates.map((laur,index) => {
                    return (<tr key={index} >{laur.firstname} {laur.surname}</tr>)
                  })}
                  </td>
                </tr>
              ];
            }else{
                return[
                    <tr  className="tableTR" key={index}>
                    <td className="award-category">NA</td>
                    <td className="laur">NA</td>
                    </tr>
                ];
            }
          })}
        </>
      )}
    </>
  );
};

export default Award;
