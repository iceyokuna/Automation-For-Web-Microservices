import styled, { keyframes } from 'styled-components';
import Background from 'assets/images/background_2.png';
import { TableRow as TRow } from 'grommet';

const scaleUp = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.05);
  }

`

export const TableRow = styled(TRow)`
&:hover {
  cursor: pointer;
  animation: ${scaleUp} 0.5s forwards;
}
`

export const FillParent = styled.div`
  width: 100%;
  height: 100%;
`

export const global = {
  color: {
    green1: '#009688',
    white1: '#ffffff',
    white2: '#eeeeee',
  },
  globalContainer: {
    width: '100%',
    height: '100%',
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    alignItems: 'center',
    backgroundImage: `url(${Background})`,
    backgroundColor: `rgba(255,255,255,0.2)`,
    backgroundBlendMode: 'color',
    // justifyContent: 'center',
    // display: 'flex',
  },
  mainContainer: {
    width: '100%',
    maxWidth: 1200,
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 'auto',
    // backgroundColor: '#ffffff',
    padding: 10,
    height: '100%',
    // overflow: 'scroll',
  }
};
