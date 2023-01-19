import React from "react";
import AddLineIcon from "remixicon-react/AddLineIcon";
import SubtractLineIcon from "remixicon-react/SubtractLineIcon";

const AccordionSummary = ({ children, id, handleClick, idList }) => {
  return (
    <div className="accordion-summary" onClick={() => handleClick(id)}>
      {children}
      {idList?.includes(id) ? (
        <SubtractLineIcon size={32} />
      ) : (
        <AddLineIcon size={32} />
      )}
    </div>
  );
};

export default AccordionSummary;
