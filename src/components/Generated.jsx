import "../CSS/Generated.css"

const Generated = ({ formData, formDetails }) => {
  // Group form details by section
  const sections = formDetails.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  const renderSection = (section, fields) => (
    <div className="cv_section" key={section}>
      <h2>{section}</h2>
      {fields.map((item, index) => (
        <div style={{display: 'flex', alignItems: 'center', gap: "20px"}} key={index}>
          <label>{item.label}</label>
          {renderField(item, formData[item.name])}
        </div>
      ))}
    </div>
  );

  const renderField = (item, value) => {
    if (item.type === "text" && item.name === "responsibilities") {
      return (
        <ul>
          {value &&
            value.split('\n').map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
        </ul>
      );
    } else if (item.type === "text") {
      return <p>{value || "N/A"}</p>;
    } else if (item.type === "textarea") {
      return <p dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br />") }} />;
    } else if (item.type === "multiselect") {
      return (
        <ul>
          {value &&
            value.map((listItem, index) => (
              <li key={index}>{listItem}</li>
            ))}
        </ul>
      );
    } else if (item.type === "date") {
      // Format the date before rendering
      const formattedDate = value ? new Date(value).toLocaleDateString() : "N/A";
      return(
      <div>
        <p>{formattedDate}</p>
      </div> )
      
    } else {
      return <p>{value || "N/A"}</p>;
    }
  };
  
  return (
    <div className="cv_generated">
      {Object.entries(sections).map(([section, fields], index) =>
        renderSection(section, fields)
      )}
    </div>
  );
};

export default Generated;
