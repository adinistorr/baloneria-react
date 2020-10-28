import React from 'react'
import ReactTypingEffect from 'react-typing-effect';
import styles from './styles/TypingEffect.module.css'

const TypingEffect = (props) => {
    return (
      <ReactTypingEffect className={ `h1 ${styles['header-typing-effect']}` } text = { props.text } speed = { 150 } typingDelay = { 200 } eraseDelay = { 200 }/>
    );
  };

  export default TypingEffect;