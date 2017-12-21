import React from 'react';
import PropTypes from 'prop-types';
import './TeslaCar.css';

const TeslaCar = props => (
  <div className="tesla-car">
    <div className="tesla-wheels">
      <div
        className={`tesla-wheel telsa-wheel--front tesla-wheel--${
          props.wheelsize
        }`}
      />
      <div
        className={`tesla-wheel telsa-wheel--rear tesla-wheel--${
          props.wheelsize
        }`}
      />
    </div>
  </div>
);

TeslaCar.propTypes = {
  wheelsize: React.PropTypes.number,
};

export default TeslaCar;
