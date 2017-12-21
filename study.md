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

``` js
<App> -- Application entry point
 <Header></Header>
  <TeslaBattery> -- Container
    <TeslaCar />     -- Presentational Component
    <TeslaStats />   -- Presentational Component
    <TeslaCounter /> -- Presentational Component
    <TeslaClimate /> -- Presentational Component
    <TeslaWheels />  -- Presentational Component
    <TeslaNotice />  -- Presentational Component
  </TeslaBattery>
</App>
```

## 함수형 컴포넌트

* 컴포넌트가 함수(ES6 Arrow Function) 형태로 되어 있는데 이런 형식으로 선언된 컴포넌트는 함수형 컴포넌트 (Functional Component)라 부른다.
* 만약에 state가 없고 Lifecycle 메소드가 필요치 않다면 함수형으로 선언하는 것이 좋은 패턴이다.
* 함수형 컴포넌트는 상태가 없고 오직 전달받는 props에만 의존하기 때문에 Presentational Component에 적합하다.

함수형 컴포넌트 : state없고 lifecycle 메소드가 없다. 따라서 Presentational Component에 적합하다.

``` js
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


## Container에 Component 렌더링

Container : *TeslaBattery.js*

``` js
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

Component : *TelsaNotice.js*
* Presentational Component
* 함수형 컴포넌트

``` js
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

``` js
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
<TeslaNotice />
```

## Props-type

여기서 React built-in typechecking 기능을 이용하여 propTypes를 지정하였다. 개발모드에서 React는 컴포넌트에 전달되는 props를 체크하게 된다. (성능상의 이유로 오직 개발모드에서만 가능하다) 각 props 속성에 대해 React는 (1) prop이 예상되는지 (2) prop이 올바른 유형인지 확인하기 위해 컴포넌트의 propType 객체에서 이를 찾으려고 시도한다.
