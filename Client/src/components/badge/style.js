import styled from 'styled-components';
import { colors } from 'theme';

export const BadgeIcon = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  color: white;
  font-size: 10px;
  background-color: ${colors["status-critical"]}
  border-radius: 50%;
  line-height: 20px;
  width: 20px;
  height: 20px;
  text-align: center;
`