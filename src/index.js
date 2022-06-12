/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function or(x, y) {
  return x === null ? y : x;
}

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function defaultFunction(x, y) {
  return or(y, x);
}

function calculate(operator, result, number) {
  return (operatorFunctions[operator] || defaultFunction)(result, number);
}

const initialState = {
  result: 0,
  number: null,
  operator: '',
};

function render({ result, number, operator }) {
  const onClickReset = () => {
    render(initialState);
  };
  const onClickNumber = (value) => {
    render({
      result,
      number: (number || 0) * 10 + value,
      operator,
    });
  };

  const onClickOperator = (value) => {
    render({
      result: calculate(operator, result, number),
      number: null,
      operator: value,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{or(number, result)}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => onClickNumber(i)}>{i}</button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type="button" onClick={() => onClickOperator(i)}>{i}</button>
        ))}
      </p>
      <p>
        <button type="button" onClick={() => onClickReset()}>reset</button>
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
