
import React from 'react';
import PropTypes from 'prop-types';
const TextInput = ({name, label,glyphicon, onChange, placeholder, value, error, type,autoFocus}) => {
  let errorLabelStyle ={marginLeft:'40px'}; 
  let wrapperClass = 'input-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  let glyphicon_class = "glyphicon " + glyphicon;

  return (
      <div className="form-group">
        <div className={wrapperClass}>
          <span className="input-group-addon"><i className={glyphicon_class}></i></span>
          <input
            className="form-control"
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required = "required"
            autoFocus = {autoFocus}
            />
        </div>
        {error && <label style={errorLabelStyle} className="help-block text-danger">{error}</label>}
      </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  glyphicon:PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  autoFocus: PropTypes.string.isRequired
};
TextInput.defaultProps = {
  name: PropTypes.string,
  label: "",
  type: "text",
  glyphicon:"glyphicon-user",
  onChange: PropTypes.func,
  value: "",
  autoFocus: "autoFocus" 
};

export default TextInput;
