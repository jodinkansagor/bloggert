import React from 'react'
import "./button.scss"
import clsx from "clsx"

type ButtonProps = {
  title: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  type?: "submit"
}

function Button(props: ButtonProps) {
  const { title, onClick, size = "md", type} = props

  return (
    <button className={clsx("button", size)} onClick={onClick} type={type}>
        {title}
      </button>
  )
}

export default Button