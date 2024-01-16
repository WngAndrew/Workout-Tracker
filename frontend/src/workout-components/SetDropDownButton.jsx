import React, { useState } from 'react'
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

export default function SetDropDownButton({toggleStateComms, exerciseId}) {
    const [toggleArrow, setToggleArrow] = useState(false)

    const handleToggle = () => {
        const toggleState = !toggleArrow
        setToggleArrow(toggleState)
        toggleStateComms(toggleState, exerciseId)
    }

  return (
    <div>
        {toggleArrow ? 
        (<FaCaretDown onClick={handleToggle}></FaCaretDown>) : 
        (<FaCaretRight onClick={handleToggle}></FaCaretRight>)}
    </div>
  )
}
