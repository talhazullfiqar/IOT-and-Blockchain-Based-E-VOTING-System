// "use client";
// import React, { useEffect, useState } from "react";
// import "./TimerComponent.css";

// const Timer = ({ onEnd }) => {
//   // Accept the onEnd callback as a prop
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//     durations: {
//       hours: 24,
//       minutes: 60,
//       seconds: 60,
//     },
//   });

//   const addDays = 0;
//   const addHours = 0;
//   const addMinutes = 1;
//   const addSeconds = 10;

//   useEffect(() => {
//     // Recalculate the target date each time the effect runs
//     const targetDate = new Date();
//     targetDate.setDate(targetDate.getDate() + addDays);
//     targetDate.setHours(targetDate.getHours() + addHours);
//     targetDate.setMinutes(targetDate.getMinutes() + addMinutes);
//     targetDate.setSeconds(targetDate.getSeconds() + addSeconds);

//     const calculateTimeLeft = () => {
//       const difference = targetDate - new Date();

//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//           durations: {
//             hours: 24,
//             minutes: 60,
//             seconds: 60,
//           },
//         });
//       } else {
//         onEnd(); // Call the onEnd callback when the timer ends
//       }
//     };

//     const timer = setInterval(calculateTimeLeft, 1000);
//     calculateTimeLeft(); // Initial call to set the time immediately

//     return () => clearInterval(timer);
//   }, [addDays, addHours, addMinutes, addSeconds, onEnd]); // Add dependencies here

//   const CircleTimer = ({ value, type, maxValue }) => {
//     const strokeWidth = 7;
//     const radius = (100 - strokeWidth) / 2; // Adjust size as needed
//     const circumference = radius * 2 * Math.PI;
//     const progress = (value / maxValue) * 100;
//     const strokeDashoffset = circumference - (progress / 100) * circumference;

//     return (
//       <div className="circle-timer" style={{ width: 100, height: 100 }}>
//         <svg className="background-circle" width={100} height={100}>
//           <circle
//             cx={100 / 2}
//             cy={100 / 2}
//             r={radius}
//             fill="transparent"
//             stroke="#e5e5e5"
//             strokeWidth={strokeWidth}
//           />
//         </svg>

//         <svg className="progress-circle" width={100} height={100}>
//           <circle
//             cx={100 / 2}
//             cy={100 / 2}
//             r={radius}
//             fill="transparent"
//             stroke="#17b4d3"
//             strokeWidth={strokeWidth}
//             strokeDasharray={circumference}
//             strokeDashoffset={strokeDashoffset}
//             strokeLinecap="round"
//             style={{
//               transition: "stroke-dashoffset 1s linear",
//               transform: "rotate(-90deg)",
//               transformOrigin: "50% 50%",
//             }}
//           />
//         </svg>

//         <div className="time-display">
//           <div className="time-value">{value}</div>
//           <div className="time-label">
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="timer-container">
//       <CircleTimer value={timeLeft.days} type="Days" maxValue={365} />
//       <CircleTimer
//         value={timeLeft.hours}
//         type="Hours"
//         maxValue={timeLeft.durations.hours}
//       />
//       <CircleTimer
//         value={timeLeft.minutes}
//         type="Minutes"
//         maxValue={timeLeft.durations.minutes}
//       />
//       <CircleTimer
//         value={timeLeft.seconds}
//         type="Seconds"
//         maxValue={timeLeft.durations.seconds}
//       />
//     </div>
//   );
// };

// export default Timer;

"use client";
import React, { useEffect, useState } from "react";
import "./TimerComponent.css";

const Timer = ({ onEnd }) => {
  // Accept the onEnd callback as a prop
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    durations: {
      hours: 24,
      minutes: 60,
      seconds: 60,
    },
  });

  const [isFrozen, setIsFrozen] = useState(false); // New state to freeze the timer

  const addDays = 0;
  const addHours = 0;
  const addMinutes = 0;
  const addSeconds = 10;

  useEffect(() => {
    // Recalculate the target date each time the effect runs
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + addDays);
    targetDate.setHours(targetDate.getHours() + addHours);
    targetDate.setMinutes(targetDate.getMinutes() + addMinutes);
    targetDate.setSeconds(targetDate.getSeconds() + addSeconds);

    const calculateTimeLeft = () => {
      if (isFrozen) return; // Don't update time if frozen

      const difference = targetDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          durations: {
            hours: 24,
            minutes: 60,
            seconds: 60,
          },
        });
      } else {
        onEnd(); // Call the onEnd callback when the timer ends
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call to set the time immediately

    return () => clearInterval(timer);
  }, [addDays, addHours, addMinutes, addSeconds, isFrozen, onEnd]); // Add isFrozen to dependencies

  const CircleTimer = ({ value, type, maxValue }) => {
    const strokeWidth = 7;
    const radius = (100 - strokeWidth) / 2; // Adjust size as needed
    const circumference = radius * 2 * Math.PI;
    const progress = (value / maxValue) * 100;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="circle-timer" style={{ width: 100, height: 100 }}>
        <svg className="background-circle" width={100} height={100}>
          <circle
            cx={100 / 2}
            cy={100 / 2}
            r={radius}
            fill="transparent"
            stroke="#e5e5e5"
            strokeWidth={strokeWidth}
          />
        </svg>

        <svg className="progress-circle" width={100} height={100}>
          <circle
            cx={100 / 2}
            cy={100 / 2}
            r={radius}
            fill="transparent"
            stroke="#17b4d3"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s linear",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>

        <div className="time-display">
          <div className="time-value">{value}</div>
          <div className="time-label">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        </div>
      </div>
    );
  };

  const toggleFreeze = () => {
    setIsFrozen((prev) => !prev); // Toggle freeze state
  };

  return (
    <div className="timer-container">
      <CircleTimer value={timeLeft.days} type="Days" maxValue={365} />
      <CircleTimer
        value={timeLeft.hours}
        type="Hours"
        maxValue={timeLeft.durations.hours}
      />
      <CircleTimer
        value={timeLeft.minutes}
        type="Minutes"
        maxValue={timeLeft.durations.minutes}
      />
      <CircleTimer
        value={timeLeft.seconds}
        type="Seconds"
        maxValue={timeLeft.durations.seconds}
      />
      <button onClick={toggleFreeze}>
        {/* {isFrozen ? "Resume Timer" : "Freeze Timer"} */}
      </button>
    </div>
  );
};

export default Timer;
