import styled from 'styled-components';
import { colors } from 'theme';

export const MethodContainer = styled.div`
  position: relative;
`

export const BadgeIcon = styled.div`
  position: absolute;
  right: 5px;
  top: -10px;
  color: white;
  font-size: 14px;
  background-color: ${colors["status-critical"]}
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
`