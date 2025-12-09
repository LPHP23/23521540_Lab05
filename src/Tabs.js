import { createContext, useContext, useState, useId, useMemo } from "react";
import PropTypes from "prop-types";

const TabsContext = createContext(null);

export function Tabs({ defaultIndex = 0, children, onChange }) {
  const [active, setActive] = useState(defaultIndex);
  const id = useId();

  const handleSetActive = (index) => {
    setActive(index);
    onChange?.(index);
  };

  const value = useMemo(
    () => ({ active, setActive: handleSetActive, id }),
    [active, id, handleSetActive]
  );

  return (
    <TabsContext.Provider value={value}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.propTypes = {
  defaultIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs parent");
  }
  return context;
}

Tabs.List = function TabsList({ children, ariaLabel = "Tabs" }) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="tabs-list">
      {children}
    </div>
  );
};

Tabs.List.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
};

Tabs.Tab = function Tab({ index, children, disabled = false }) {
  const { active, setActive, id } = useTabsContext();
  const isActive = active === index;

  const handleClick = () => {
    if (!disabled) {
      setActive(index);
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(index);
    }
  };

  return (
    <button
      role="tab"
      id={`${id}-tab-${index}`}
      aria-selected={isActive}
      aria-controls={`${id}-panel-${index}`}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`tab ${isActive ? "active" : ""} ${disabled ? "disabled" : ""}`}
    >
      {children}
    </button>
  );
};

Tabs.Tab.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Tabs.Panel = function TabPanel({ index, children }) {
  const { active, id } = useTabsContext();
  const isActive = active === index;

  return (
    <div
      role="tabpanel"
      id={`${id}-panel-${index}`}
      aria-labelledby={`${id}-tab-${index}`}
      hidden={!isActive}
      tabIndex={0}
      className="tab-panel"
    >
      {isActive ? children : null}
    </div>
  );
};

Tabs.Panel.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
