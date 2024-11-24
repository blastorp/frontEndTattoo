import React, { useState } from "react";
import "../estilos/agendaartista.css";

const AgendaArtistas = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  const days = [
    { name: "Lun", date: "21" },
    { name: "Mar", date: "22" },
    { name: "Mier", date: "23" },
    { name: "Jue", date: "24" },
    { name: "Vie", date: "25" },
    { name: "Sab", date: "26" },
  ];

  const availableHours = ["9:00", "10:00", "14:00"];
  const memberHours = ["11:00", "13:00", "15:00", "16:00", "17:00"];

  const handleDayClick = (day) => {
    setSelectedDay(day);
    console.log(`Día seleccionado: ${day}`);
  };

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    console.log(`Hora seleccionada: ${hour}`);
  };

  const handleCotizacionSubmit = () => {
    console.log("Cotización enviada");
  };

  const handleAgendar = () => {
    if (selectedDay && selectedHour) {
      console.log(`Agendado para ${selectedDay} a las ${selectedHour}`);
    } else {
      console.log("Selecciona un día y un horario antes de agendar.");
    }
  };

  return (
    <div>
      <div className="cotizacion-container">
        <input
          type="text"
          placeholder="Número de cotización"
          className="input-cotizacion"
        />
        <button className="btn-enviar" onClick={handleCotizacionSubmit}>
          Enviar
        </button>
      </div>

      <div id="agenda">
        <div className="dias-semana">
          <button className="navegacion">&lt;</button>
          {days.map((day) => (
            <div
              key={day.name}
              className={`dia ${selectedDay === day.name ? "seleccionada" : ""}`}
              onClick={() => handleDayClick(day.name)}
            >
              {day.name}
              <br />
              {day.date}
            </div>
          ))}
          <button className="navegacion">&gt;</button>
        </div>

        <section className="horarios">
          <h2>Horarios disponibles</h2>
          <div className="horas">
            {availableHours.map((hour) => (
              <div
                key={hour}
                className={`hora ${selectedHour === hour ? "seleccionada" : ""}`}
                onClick={() => handleHourClick(hour)}
              >
                {hour}
              </div>
            ))}
          </div>

          <h2>Horarios disponibles para miembros</h2>
          <div className="horas">
            {memberHours.map((hour) => (
              <div
                key={hour}
                className={`hora ${selectedHour === hour ? "seleccionada" : ""}`}
                onClick={() => handleHourClick(hour)}
              >
                {hour}
              </div>
            ))}
          </div>
        </section>

        <button className="btn-agendar" onClick={handleAgendar}>
          Agendar
        </button>
      </div>
    </div>
  );
};

export default AgendaArtistas;
