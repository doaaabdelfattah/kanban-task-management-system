const sizes = {
  large: 'py-3.5 px-16 heading-md rounded-3xl',
  small: 'py-2 px-[4.3rem] max-md:px-3 small-btn-font rounded-[1.25rem]',
}

const colors = {
  primary: 'bg-main-purple text-primary-white hover:bg-main-purple-hover',
  secondary: ' bg-main-purple/10 hover:bg-main-purple/25 text-main-purple dark:bg-white dark:hover:bg-white ',
  destructive: 'bg-main-red hover:bg-main-red-hover text-primary-white',
}

function Button({ children, size, color, handleOnClick, onType = "button" }) {
  return (
    <button className={`${sizes[size]} ${colors[color]} w-full cursor-pointer`} onClick={handleOnClick} type={onType}>
      {children}
    </button>
  )
}

export default Button
