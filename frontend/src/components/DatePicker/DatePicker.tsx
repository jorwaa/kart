import React, { useEffect, useState } from "react";

export const DatePicker = ({
  onSelect,
  onUnSelect,
  date,
  antall,
  color
}: {
  onSelect: () => void;
  onUnSelect: () => void;
  date: string;
  antall: string;
  color: string;
  }) => {

    const [isActive, setIsActive] = React.useState(false);

    useEffect(() => {
      if (isActive) {
        onSelect();
      } else {
        onUnSelect();
      }
    });

    const readableDate = new Intl.DateTimeFormat('no-NO', {
      dateStyle: 'full',
    }).format(new Date(date)).slice(0, -5)

    return (
    <div role="button" onClick={() => {setIsActive(!isActive)}}
      style={
        {
        display: "flex",
        overflowX: "auto",
        height: "100%",
        width: "50%",
        textAlign: "center", 
        justifyContent: "center",
        border: "1px solid black",
        flexDirection: "column", 
        flex: "none", 
        margin: "0px 0px 0px 1px",
        backgroundColor: (isActive ? color : "white")}
      }>
      <h5 style={{textAlign: "center"}}>{readableDate}</h5>
      <p>{isActive ? "Klikk for å fjerne fra kartet" : "Klikk for å vise på kartet"}</p>
    </div>
    );
  }