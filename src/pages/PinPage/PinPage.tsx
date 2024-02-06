import { MouseEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './PinPage.module.scss';
import { validatePin } from '../../services/KioskInfo';

interface PinCharProperties {
  active: boolean;
}

function PinChar(props: PinCharProperties) {
  const klazz = (props.active) ? styles.PinCharActive : styles.PinChar
  return (<div className={klazz} />)
}

// const PinPage = () => (
function PinPage() {
  const history = useNavigate();

  // Entered value through pin pad
  const [pin, setPin] = useState("")

  function pinFailed() {
    const element = document.querySelector('.pin-display');
    element?.classList.add('animate__bounce');

    setTimeout(function () {
      element?.classList.remove('animate__bounce');
      setPin("");
    }, 700);
  }

  function validate(entered: string) {
    console.log('validing pin ' + entered)
    validatePin(entered).then(res => {
      if (res.valid) {
        history("/stats", { state:{ message: "Can't retrieve sales!" }});
      } else {
        console.log("res not valid")
        console.log(res)
        pinFailed()
      }
    }).catch(err => {
      console.log(err)
      pinFailed()
    })
  }

  function Display() {
    return (
      <div className="pin-display animate__animated ">
        <div className="row mx-5 mb-4">
          <div className="col-3">
            <PinChar active={pin.length >= 1} />
          </div>
          <div className="col-3">
            <PinChar active={pin.length >= 2} />
          </div>
          <div className="col-3">
            <PinChar active={pin.length >= 3} />
          </div>
          <div className="col-3">
            <PinChar active={pin.length >= 4} />
          </div>
        </div>
      </div>
    )
  }

  function Calculator() {

    function onDigitClick(e: MouseEvent) {
      // e.preventDefault();
      const target = e.target as Element;
      const targetValue: string = target.innerHTML
      const nextValue: string = pin + targetValue
      setPin(nextValue);
      if (nextValue.length >= 4) { validate(nextValue); }
    }

    function onClear() {
      setPin("")
    }

    return (
      <div className="row mx-2">
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">7</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">8</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">9</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">4</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">5</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">6</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">1</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">2</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">3</button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onClear} className="btn btn-orange btn-lg btn-block mb-2">
            <i className="fa fa-undo" />
          </button>
        </div>
        <div className="col-4 px-1">
          <button onClick={onDigitClick} className="btn btn-secondary btn-lg btn-block mb-2">0</button>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.PinPage}>
      <div className="content-pane">
        <div className="content-bg d-flex flex-column">
          <div className="my-auto" />
          <div className="pin-wrapper" style={{ margin: '0 auto', width: '400px' }}>
            <h1 className="text-center mb-5">ENTER PIN</h1>
            <Display />
            <Calculator />
          </div>
          <div className="my-auto" />
        </div>
      </div>
    </div>
  )
}

export default PinPage;
