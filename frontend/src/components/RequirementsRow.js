import React from 'react';
import './styles/RequirementsRow.module.css'; // Import CSS Module for row styles

const RequirementsRow = ({ requirement, groupIndex, reqIndex, groupTitle }) => {
  const functionalRequirement = requirement.functionalRequirement || requirement;
  const details = requirement.details ? requirement.details.join(', ') : '';
  const components = requirement.components || [];

  return components.map((component, componentIndex) => (
    <tr key={component}>
      {componentIndex === 0 && (
        <>
          <td rowSpan={components.length}>{`${groupIndex + 1}.${reqIndex + 1}`}</td>
          <td rowSpan={components.length}>{functionalRequirement}</td>
          <td rowSpan={components.length}>{details}</td>
          <td rowSpan={components.length}>{groupTitle}</td>
        </>
      )}
      <td>{component}</td>
      <td><input type="checkbox" className="coding" /></td>
      <td><input type="checkbox" className="testing" disabled /></td>
      <td><input type="checkbox" className="deployment" disabled /></td>
      <td><span className="bubble"></span></td>
      <td><span className="status-bubble status-pending"></span><span className="status-text">Pending</span></td>
      <td><input type="date" className="target-date" /></td>
      <td><input type="date" className="actual-date" /></td>
    </tr>
  ));
};

export default RequirementsRow;
