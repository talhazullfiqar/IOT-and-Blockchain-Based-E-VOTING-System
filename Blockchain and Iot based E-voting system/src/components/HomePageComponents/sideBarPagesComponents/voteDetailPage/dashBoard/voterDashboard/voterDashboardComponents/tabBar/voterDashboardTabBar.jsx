"use client";
import { useState, useEffect, useRef } from "react";
import "./VoterDashboardTabBar.css";

const VoterDashboardTabBar = ({
  activeTab,
  setActiveTab,
  firstTabName,
  secondTabName,
}) => {
  const tabRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    if (tabRefs.current[activeTab - 1]) {
      const tabElement = tabRefs.current[activeTab - 1];
      setIndicatorStyle({
        width: `${tabElement.offsetWidth}px`,
        left: `${tabElement.offsetLeft}px`,
      });
    }
  }, [activeTab]);

  return (
    <div className="tab-bar-container">
      <ul className="tab-bar">
        <div className="tab-indicator" style={indicatorStyle}></div>
        {[firstTabName, secondTabName].map((text, index) => (
          <li
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`tab-item ${activeTab === index + 1 ? "active" : ""}`}
            onClick={() => setActiveTab(index + 1)}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoterDashboardTabBar;
