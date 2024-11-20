import React, { useState, useEffect } from 'react';
import RequirementsRow from './RequirementsRow';
import './styles/RequirementsTable.module.css'; // Import CSS Module for table styles

const RequirementsTable = () => {
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    // Fetch requirements data
    const fetchRequirements = async () => {
      try {
        const response = await fetch('/path/to/tracability_data.json');
        const data = await response.json();
        setRequirements(data.steps);
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    };

    fetchRequirements();
  }, []);

  return (
    <div className="table-container">
      <table className="requirements-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Functional Requirement</th>
            <th>Details</th>
            <th>Architecture Layer</th>
            <th>Component</th>
            <th>Coding</th>
            <th>Testing</th>
            <th>Deployment</th>
            <th>Completion</th>
            <th>Status</th>
            <th>Target Date</th>
            <th>Actual Date</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((group, groupIndex) =>
            group.requirements.map((req, reqIndex) => (
              <RequirementsRow
                key={`${groupIndex}-${reqIndex}`}
                requirement={req}
                groupIndex={groupIndex}
                reqIndex={reqIndex}
                groupTitle={group.title}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequirementsTable;
