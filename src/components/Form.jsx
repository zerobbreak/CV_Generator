import { useState } from "react";
import DatePicker from "react-datepicker";
import Generated from "./Generated";
import { forms } from "./data";
import "../CSS/Form.css";
// import Generated from "./Generated";

const Form = ({ formDetails }) => {
  const [formData, setFormData] = useState({});
  const [sectionStates, setSectionStates] = useState(
    Object.fromEntries(formDetails.map((item) => [item.section, true]))
  );

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDateChange = (fieldName, date) => {
    setFormData({ ...formData, [fieldName]: date });
  };

  const toggleSection = (section) => {
    setSectionStates({
      ...sectionStates,
      [section]: !sectionStates[section],
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  // Group form details by section
  const sections = formDetails.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="container">
      <div className="form">
        {Object.entries(sections).map(([section, fields], index) => (
          <div className="sections__container" key={index}>
            <div className="section-header" style={{ }}>
              <h3 className="section__title">{section}</h3>
              <button style={{width: "150px", height: "50px", padding: "10px", }} onClick={() => toggleSection(section)}>
                {sectionStates[section] !== "Personal Information"
                  ? "Collapse"
                  : "Expand"}
              </button>
            </div>
            {sectionStates[section] && (
              <>
                {fields.map((item, index) => (
                  <div className="section__inputs" key={index}>
                    <label className="section__inputs-label">{item.label}</label>
                    {item.type === "text" &&
                    item.name === "responsibilities" ? (
                      <textarea
                        value={formData[item.name] || ""}
                        onChange={(e) =>
                          handleInputChange(item.name, e.target.value)
                        }
                        style={{padding: "20px", width: "200px", height: "100px"}}
                      />
                    ) : (
                      <input
                        type={item.type}
                        value={formData[item.name] || ""}
                        onChange={(e) =>
                          handleInputChange(item.name, e.target.value)
                        }
                      />
                    )}
                    {item.type === "number" && (
                      <input
                        type="number"
                        value={formData[item.name] || ""}
                        onChange={(e) =>
                          handleInputChange(item.name, e.target.value)
                        }
                      />
                    )}

                    {item.type === "date" && (
                      <DatePicker
                        selected={formData[item.name] || null}
                        onChange={(date) => handleDateChange(item.name, date)}
                      />
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <Generated formData={formData} formDetails={forms} />
    </div>
  );
};

export default Form;
