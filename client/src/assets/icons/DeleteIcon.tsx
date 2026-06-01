import React from 'react'

const DeleteIcon = ({ size = 10, color = '#DC143C' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.3"
        d="M5 1C2.795 1 1 2.795 1 5C1 7.205 2.795 9 5 9C7.205 9 9 7.205 9 5C9 2.795 7.205 1 5 1ZM7.5 5.5H2.5V4.5H7.5V5.5Z"
        fill={color}
        fillOpacity="0.8"
      />
      <path
        d="M2.5 4.5H7.5V5.5H2.5V4.5ZM5 0C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10C7.76 10 10 7.76 10 5C10 2.24 7.76 0 5 0ZM5 9C2.795 9 1 7.205 1 5C1 2.795 2.795 1 5 1C7.205 1 9 2.795 9 5C9 7.205 7.205 9 5 9Z"
        fill={color}
        fillOpacity="0.8"
      />
    </svg>
  )
}

export default DeleteIcon
