import React from 'react'
import "./header.scss"
import tallit from "./assets/tallitB.png"
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  return (
    <div className="header" onClick={() => navigate("/")}>
      <img className="header__img" src={tallit} alt="graphic of tefillin" />
      <div className="header__text">
        <h1 className="header__title">UnWrapping</h1>
        <h3 className="header__subTitle">Breaking up with my Zionist past.</h3>
      </div>
    </div>
  )
}

export default Header;