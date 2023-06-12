import React, { memo } from "react"
import { NavLink } from "react-router-dom"

import classNames from "classnames"

import Style from "./style"

const navClassnames = ({ isActive }) => classNames({ "nav-active": isActive }, "nav-link")

const Nav = memo(() => {
  return (
    <Style>
      <nav>
        <NavLink className={navClassnames} to="watermark">
          水印
        </NavLink>
        <NavLink className={navClassnames} to="about">
          关于
        </NavLink>
      </nav>
    </Style>
  )
})

export default Nav
