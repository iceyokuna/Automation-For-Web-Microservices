import styled from 'styled-components';
import { colors } from 'theme';

export const MethodContainer = styled.div`
  position: relative;
`

export const BadgeIcon = styled.div`
  position: absolute;
  right: 0px;
  top: -15px;
  color: white;
  font-size: 12px;
  background-color: ${colors["status-critical"]}
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
`