# 휘리릭

## Container and presentational components

### Container Component (stateful component)

* 어떻게 동작하는지에 관심이있다.
* 일반적으로 일부 랩핑 div 를 제외하고는 자체 DOM 마크업이 없으며 스타일을 갖지 않는다.
* 프리젠테이션 또는 다른 컨테이너에 데이터와 동작을 제공한다.
* 애플리케이션의 상태를 가지며 데이터 소스 역할을 한다.

### Presentational Component (stateless component)

* 어떻게 보이는지에 관심이있다.
* 일반적으로 자체 DOM 마크업과 스타일을 가지고 있다.
* Props 를 통해 데이타와 콜백 함수를 받는다.
* 상태를 거의 갖지 않으며 있다 하더라도 데이터 대신에 UI 상태를 갖는다.

```js
<App>
  -- Application entry point
  <Header />
  <TeslaBattery>
    -- Container
    <TeslaCar /> -- Presentational Component
    <TeslaStats /> -- Presentational Component
    <TeslaCounter /> -- Presentational Component
    <TeslaClimate /> -- Presentational Component
    <TeslaWheels /> -- Presentational Component
    <TeslaNotice /> -- Presentational Component
  </TeslaBattery>
</App>
```

## 함수형 컴포넌트

* 컴포넌트가 함수(ES6 Arrow Function) 형태로 되어 있는데 이런 형식으로 선언된 컴포넌트는 함수형 컴포넌트 (Functional Component)라 부른다.
* 만약에 state 가 없고 Lifecycle 메소드가 필요치 않다면 함수형으로 선언하는 것이 좋은 패턴이다.
* 함수형 컴포넌트는 상태가 없고 오직 전달받는 props 에만 의존하기 때문에 Presentational Component 에 적합하다.

함수형 컴포넌트 : state 없고 lifecycle 메소드가 없다. 따라서 Presentational Component 에 적합하다.

```js
import React from 'react';
import './Header.css';
import logoUrl from '../../asset/logo.svg';

const Header = () => (
  <div className="header">
    <img src="{logoUrl}" alt="Tesla" />
  </div>
);

export default Header;
```

## 스타일

* 컴포넌트에 스타일 주는 방법은 여러가지 있으나 여기서는 `components`디렉토리 안에 각 컴포넌트 디렉토리를 만들고 `js`,`css`파일을 쌍으로 만들것이다.

## Container 에 Component 렌더링

Container : _TeslaBattery.js_

```js
import React, { Component } from 'react';
import './TeslaBattery.css';
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';

class TeslaBattery extends Component {
  render() {
    return (
      <form className="tesla-battery">
        <h1>Range Per Charge</h1>
        <TeslaNotice />
      </form>
    );
  }
}

export default TeslaBattery;
```

Component : _TelsaNotice.js_

* Presentational Component
* 함수형 컴포넌트

```js
import React from 'react';
import './TeslaNotice.css';

const TeslaNotice = () => (
  <div className="tesla-battery__notice">
    <p>
      The actual amount of range that you experience will vary based on your
      particular use conditions. See how particular use conditions may affect
      your range in our simulation model.
    </p>
    <p>
      Vehicle range may vary depending on the vehicle configuration, battery age
      and condition, driving style and operating, environmental and climate
      conditions.
    </p>
  </div>
);

export default TeslaNotice;
```

*TeslaBattery.js*에 `TeslaNotice` 컴포넌트 추가

```js
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
<TeslaNotice />;
```

## Props-type

여기서 React built-in typechecking 기능을 이용하여 propTypes 를 지정하였다. 개발모드에서 React 는 컴포넌트에 전달되는 props 를 체크하게 된다. (성능상의 이유로 오직 개발모드에서만 가능하다) 각 props 속성에 대해 React 는 (1) prop 이 예상되는지 (2) prop 이 올바른 유형인지 확인하기 위해 컴포넌트의 propType 객체에서 이를 찾으려고 시도한다.

## 데이터 흐름

* Parent Component 나 Child Component 둘다 특정 Component 가 있는(stateful) 또는 상태가 없는지(stateless) 여부를 알 수 없으며 함수형 또는 클래스로 정의되었는지 여부도 신경 쓰지 않는다.
* 이것이 상태가 local 또는 캡슐화되었다고 부르는 이유다.
* 상태를 소유하고 설정하고 있는 컴포넌트 이외의 컴포넌트에서는 이 상태를 액세스 할 수 없다.
* 따라서 상태값은 하위 컴포넌트에 `props`로 전달되어 진다.(parent->child)
* 이를 "하향식" 또는 "단방향" 데이터 흐름이라고 한다.
* **모든 상태는 항상 특정 컴포넌트가 소유하며 해당 상태에서 파생 된 모든 데이터 또는 UI 는 트리의 구성 요소 "아래쪽 방향"에만 영향을 미친다.**

## 객체 비구조화 할당(Object Destructuring)

```js
this.state = {
  carstats: [],
  config: {
    speed: 55,
    temperature: 20,
    climate: true,
    wheels: 19,
  },
};

const { config } = this.state; // this.state 안에 있는 config를 const config 변수에 저장 속성값과 변수값이 같을때 사용가능
console.log(this.state); // {carstats: Array(0), config: {…}}
console.log(this.state.config); //  {speed: 55, temperature: 20, climate: true, wheels: 19}
console.log(config); // {speed: 55, temperature: 20, climate: true, wheels: 19}
```

> 개념적으로, React 컴포넌트는 JavaScript function 과 같아 ‘props’라 불리우는 임의의 입력을 받아 무엇이 보여져야 하는지를 묘사하는 React 엘리먼트를 리턴한다.

이러한 개념은 한마디로

> fn(d) = V

* 데이터를 입력으로 받고 `view`를 리턴하는 함수

## 순수 함수(Pure function)

> 어떠한 함수들은 입력값을 변경하지 않고 언제 같은 입력값이면 같은 출력값을 리턴한다는 의미에서 순수하다고 불리운다. (Pure function)

* 여기서 한 가지 중요한 React 의 엄격한 룰은 모든 React 컴포넌트들은 `props`에 관해서는 순수 함수와 같이 동작해야 한다는 것이다. `props`는 read-only 여야 한다.

## setState

* `import { getModelData } from '../services/BatteryService';` : BatteryService.js 에서 getModelData()를 가져온다.(import)
* `componentDidMount()` 컴포넌트가 첫 렌더링을 마친 후 실행되는 메소드
  * 참고 : [velopert](https://velopert.com/1130)
* `statsUpdate()` : `carModels` 배열 정의 및 `this.setState`를 사용해 `state` 업데이트

```js
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

    this.calculateStats = this.calculateStats.bind(this); // Class내에서 this로 접근하기 위해서는 함수내 명시적인 방인딩이 필요하다.
    this.statusUpdate = this.statusUpdate.bind(this);
  }

  calculateStats = (models, value) => {
    const dataModels = getModelData(); // carModels로 구분된 데이터 자료들
    return models.map(model => {
      const { speed, temperature, climate, wheels } = value; // ES6 Object destructuring
      const miles =
        dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][
          temperature // dataModels 접근
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
```

##

* this.state.config 를 config 로 축약

```js
const config = { ...this.state.config };
console.log(config);
console.log({ ...this.state.config });
```

## Reusable Component

* 테슬라의 속도 및 외부 온도 컨트롤은 재사용 가능한 컴포넌트이어야 하므로 단계, 최소값, 최대값 및 제목 및 단위와 같은 기타 메터 데이터를 허용하는 일반 Counter 컴포넌트를 만든다.
* 지금까지 만들어본 컴포넌트와 달리 사용자 입력(버튼 클릭, 체크 박스 등)에 반응하여 상태값을 변경하는 액션이 필요하다.
* 어떻게 하위 컴포넌트에서 발생하는 이벤트를 핸들링하는지 알아보도록 하자.
* 사용자가 속도와 온도를 클릭하여 변경(최대값과 최소값 사이)할 때마다 수치가 변경되어 렌더링 되록 상태를 업데이트
* `callback(increment, decrement)`을 `TeslaCounter`에 전달한다. 버튼에 `onClick`이벤트를 사용하여 이벤트를 알릴 수 있다.

```js
  <button
    onClick={e => props.increment(e, props.initValues.title)}
    disabled={props.currentValue >= props.initValues.max}
  />
  <button
    onClick={e => props.decrement(e, props.initValues.title)}
    disabled={props.currentValue <= props.initValues.min}
  />
```

* `TeslaBattery`에 의해 전달된 `callback`은 `setState()`를 호출하고 앱이 업데이트 된다.
* _사용자 클릭 -> TeslaBattery(callback 함수 전달) -> TeslaCounter(callback 함수 처리)_

## Default Value Props

* `TeslaCounter`에 전달되는 `initValues`는 상수값으로 `TeslaBattery`의 상위 컴포넌트인 `App`으로 부터 전달된다.
* `App`->`TeslaBattery(this.props.counterDefaultVal)`->`TeslaCounter(this.props.initValues)`

## Virtual DOM

* Single-Page-Application (SPA)는 우리에게 줄 수 있는 것은 매끄러운 사용자 경험과 상호 작용일 것이다.
* 사용자가 속도 및 온도를 변경시에 전체 페이지를 로드하지 않고 바뀐 부분만 업데이트 된다.
* 데이터를 가져오기 위해 서버에 접속할 필요가 있다 하더라도!!
* React 에서는 Virtual DOM 을 사용한다.
* 컴포넌트의 렌더링 메서드가 처음 호출되면 실제 DOM 요소 자체가 아닌 가상 DOM 이라는 DOM 모델을 출력
* 가상 DOM(Virtual DOM)은 DOM 의 모습을 나타내는 자바스크립트 데이터 구조이다.
* 그런 다음 React 는 이 모델을 가져와서 실제 DOM 요소를 생성한다.
* 그 다음 컴포넌트 상태가 변경될때마다 (`setState` 호출) 컴포넌트 렌더링 메소드가 호출되고 새 가상 DOM 이 만들어지고, 새 가상 DOM 과 이전 가상 DOM 비교한다.
* 비교 후 실제 DOM 변경사항을 나타낸다.

## TeslaClimate

* `props.value`, `props.limit`을 `boolean`값으로 전달하여 삼항연산자 사용하여 바꾼다.
* `handleChangeClimate()` 콜백함수를 통해 값을 변경

```js
handleChangeClimate() {
  const config = { ...this.state.config };
  config['climate'] = !this.state.config.climate;
  this.setState({ config });
}
```

## binding

```js
constructor(props) {
  super(props);
  ...
  this.handleChangeClimate = this.handleChangeClimate.bind(this); // 1. this바인딩 안하면
  // 2. 렌더 메소드에서 this가 window나 undefined를 가리킨다.
  ...
}
```

* 참고 : [Zerocho](https://www.zerocho.com/category/React/post/578232e7a479306028f43393
