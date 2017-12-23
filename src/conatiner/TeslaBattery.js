import React, { Component } from 'react';
import './TeslaBattery.css';
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
import TeslaCar from '../components/TeslaCar/TeslaCar';
import TeslaStats from '../components/TeslaStats/TeslaStats';
import { getModelData } from '../services/BatteryService';

class TeslaBattery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carstats: [],
      config: {
        speed: 55,
        temperature: 20,
        climate: true,
        wheels: 19,
      },
    };

    this.calculateStats = this.calculateStats.bind(this);
    this.statusUpdate = this.statusUpdate.bind(this);
  }

  calculateStats = (models, value) => {
    const dataModels = getModelData();
    return models.map(model => {
      const { speed, temperature, climate, wheels } = value;
      const miles =
        dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][
          temperature
        ];
      return {
        model,
        miles,
      };
    });
  };

  statusUpdate() {
    const carModels = ['60', '60D', '75', '75D', '90D', 'P100D'];
    this.setState({
      carstats: this.calculateStats(carModels, this.state.config),
    });
  }

  componentDidMount() {
    this.statusUpdate();
  }

  render() {
    const { config, carstats } = this.state;
    return (
      <form className="tesla-battery">
        <h1>Range Per Charge</h1>
        <TeslaCar wheelsize={config.wheels} />
        <TeslaStats carstats={carstats} />
        <TeslaNotice />
      </form>
    );
  }
}

export default TeslaBattery;
