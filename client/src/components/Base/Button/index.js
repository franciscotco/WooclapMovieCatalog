import React from 'react';

import './Button.css';

const Button = (props) => {
   const { text, className, onClick } = props;

   const handleOnClick = () => onClick();

   return (
      <div
         role="button"
         className={className || "style-button"}
         onClick={handleOnClick}
      >
         {text}
      </div>
   );
};

export default Button;