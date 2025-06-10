


const sizes = {
  large: 'py-3.5 px-16 heading-md rounded-3xl',
  small: 'py-2 px-[4.3rem] small-btn-font rounded-[1.25rem]',
}

const colors = {
  primary: 'bg-main-purple  text-primary-white hover:bg-main-purple-hover',
  secondary: ' bg-main-purple/10 hover:bg-main-purple/25 text-main-purple',
  destructive: 'bg-main-red hover:bg-main-red-hover text-primary-white',
}

function Button({ children, size, color }) {
  return (
    <button className={`${sizes[size]} ${colors[color]}  cursor-pointer`}>
      {children}
    </button>
  )
}

export default Button
