import styled, { keyframes } from 'styled-components';
import Background from 'assets/images/background_2.png';
import { TableRow as TRow, Button, } from 'grommet';

const highlight = keyframes`
  to {
    background-color: #F1F1F1;
  }
`

export const OpenDock = styled(Button)`
  position: fixed;
  bottom: 20px;
  left: calc(50%);
  transform: translateX(-50%);
  cursor: pointer;
  padding: 8px;
  border-radius: 100%;
`

export const TableRow = styled(TRow)`
&:hover {
  cursor: pointer;
  animation: ${highlight} 0.3s forwards;
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
