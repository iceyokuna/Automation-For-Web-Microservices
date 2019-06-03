import React, { useState, useEffect, } from 'react';
import { Spring, } from 'react-spring';
import { BadgeIcon, } from './style';

const index = (props) => {
  const [resetBadgeAnim, setResetBadgeAnim] = useState(props.resetBadgeAnim);

  useEffect(() => {
    setResetBadgeAnim(true);
  }, [props.length]);

  return (
    <div style={{ position: 'relative' }}>
      {props.children}

      <Spring from={{ opacity: 0, transform: "scale(0.5)" }}
        to={{ opacity: 1, transform: "scale(1.4)" }}
        reset={resetBadgeAnim}
        onRest={() => setResetBadgeAnim(false)} >
        {style => <BadgeIcon style={style}>{props.length}</BadgeIcon>}
      </Spring>

    </div >
  );
}

export default index;