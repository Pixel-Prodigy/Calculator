import React from 'react'

export function Button({children , className, ...props}) {
    
  return (
      <div className={`bg-[#0c314b]/70 flex justify-center rounded-lg active:bg-[#325b85] hover:bg-[#0c3850] transition-colors duration-200 items-center ${className}`} {...props}>{children}</div>
  )
}
