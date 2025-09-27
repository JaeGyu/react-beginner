import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// 컴포넌트
function Timer() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("Interval 실행됨");
      setCount((c) => c + 1); // 이해 한됨
    }, 1000);

    return () => {
      console.log("cleanup: 이전 타이머 제거됨");
      clearInterval(id);
    }
  }, []);

  return <div>카운트: {count}</div>;
}

const getAverage = (numbers: number[]) => {
  console.log("평균값을 계산 중입니다.");

  if (numbers.length === 0) return 0;

  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

function App() {
  const [visible, setVisible] = useState<boolean>(true);

  /**
   * useState => Hooks
   * useState는 리액트에서 가장 기본적인 훅(Hook)이며, 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해준다.
   * 이 함수가 호출되면 배열을 반환한다. 
   * 반환된 배열의 첫 번째 요소는 상태 값, 두 번째 요소는 상태 값을 설정하는 함수
   * useState 함수의 파라미터(매개변수)에는 상태의 기본값, 초기값을 넣어 준다.
  */

  //구조 분해 할당
  const [value, setValue] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => setValue(value - 1);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // useEffect(() => {
  //   // 해당 컴포넌트가 최초 렌더링 될때, useEffect가 실행이 되고,
  //   // 우리가 선어한 state 즉 상태 값이 변화하더라도 userEffect가  실행 되는 것으로 보아
  //   // state 즉, 상태 값이 변화하면 해당 컴포넌트는 재렌더링이 된다는 것을  알 수가 있습니다.
  //   console.log("컴포넌트가 렌더링 될 때마다 특정 작업을 수행합니다.");
  //   console.log("name: ", name);
  //   console.log("nickname", nickname);
  // });

  useEffect(() => {
    // 해당 컴포넌트가 최초 렌더링 될때, useEffect가 실행이 되고,
    // 우리가 선어한 state 즉 상태 값이 변화하더라도 userEffect가  실행 되는 것으로 보아
    // state 즉, 상태 값이 변화하면 해당 컴포넌트는 재렌더링이 된다는 것을  알 수가 있습니다.
    console.log("마운트가 될때만 수행 합니다. - 최초 1회 실시");
    console.log("name: ", name);
    console.log("nickname", nickname);
  }, []);

  useEffect(() => {
    // 해당 컴포넌트가 최초 렌더링 될때, useEffect가 실행이 되고,
    // 우리가 선어한 state 즉 상태 값이 변화하더라도 userEffect가  실행 되는 것으로 보아
    // state 즉, 상태 값이 변화하면 해당 컴포넌트는 재렌더링이 된다는 것을  알 수가 있습니다.
    console.log("name이라는 상태 값이 변할 경우에만 수행합니다.");
    console.log("name: ", name);
    console.log("nickname", nickname);
  }, [name]);

  /**
   * useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 훅이다.
   * - 마운트가 될때, 실행하고 싶을 때 
   * 마운트란, 리액트 DOM에 우리가 return 키워드 하단에 작성한 HTML, 
   * CSS 영역 즉, UI가 붙었을때 => 우리가 HTML을 자바스크립트로 
   * 통제 가능할 때 
   * 업데이트 될대는 실행하지 않으려면, 함수에 두 번째 파라미터로 빈 배열을 넣어주면 됩니다. 
   * 
   * - 특정 값이 업데이트 될때만 
  */

  const inputElement = useRef<HTMLInputElement | null>(null);
  const fileElement = useRef<HTMLInputElement | null>(null);


  const handleClick = () => {
    inputElement.current?.focus();
    fileElement.current?.click();
  };

  const [list, setList] = useState<number[]>([]);
  const [number, setNumber] = useState<string>("");

  // const onInsert = () => {
  //   const newList = list.concat(parseInt(number));
  //   setList(newList);
  //   setNumber("");
  // };

  const average = useMemo(() => getAverage(list), [list]);


  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  }, []);

  const onInsert = useCallback(() => {
    const newList = list.concat(parseInt(number));
    setList(newList); // number[]
    setNumber("");
  }, [number, list]);

  return (
    <div>
      <p>
        현재 카운터 값은: <b>{value}</b>
      </p>
      <p>이름: {name}</p>
      <p>별명: {nickname}</p>
      <button onClick={increment}>1 증가</button>
      <button onClick={decrement}>1 증가</button>

      <div>
        이름: <input type="text" value={name} onChange={onChangeName} />
        별명: <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNickname(e.target.value);
        }} />
      </div>

      <div>
        {visible && <Timer />}
        <button onClick={() => setVisible(!visible)}>{visible ? "숨기기" : "보이기"}</button>
      </div>
      <hr />

      <input type="text" ref={inputElement} />
      <input type="file" ref={fileElement} />
      <button onClick={handleClick}>등록</button>

      <input type="text" value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((item: number, index: number) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>

      <div>
        <b>평균 값: {average}</b>
      </div>
    </div>
  );
}

export default App
