import styled from 'styled-components'

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
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 60,
    paddingTop: 60,
    backgroundColor: '#f6f6f6',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    alignItems: 'center',
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
