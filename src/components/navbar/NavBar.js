import React from 'react'
import logo from '../../access/logoKimche.png'
import { NavBarContainer, NavBarImg } from './StyledNavBar'
export default function NavBar() {
  return (
    <NavBarContainer>
      <NavBarImg src={logo} alt='Not Found'/>
    </NavBarContainer>
  )
}
