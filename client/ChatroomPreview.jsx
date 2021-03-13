import React from 'react';
import styled from 'styled-components'
import Paper from 'material-ui/Paper';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

const Wrapper = styled.div`
  cursor: pointer;
`

const getCardTitleStyle = () => ({
  display: 'flex',
  alignItems: 'center'
})

export default ({ chatroom, onEnter }) => (
  <div style={{margin : 10}}>
    <label style={{ color : 'FFFFFF', cursor : 'pointer' }}onClick={onEnter}>{chatroom.name}</label>
  </div>
)
