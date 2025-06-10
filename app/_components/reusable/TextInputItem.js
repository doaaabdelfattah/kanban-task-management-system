
const status = {
  normal: ' outline-[#828FA3]/25',
  error: 'outline-main-red'
}

function TextInputItem({ onStatus = 'normal' }) {
  return (

    <div className="flex flex-col gap-2">
      <label className="font-bold text-medium-grey text-xs">
        TextField
      </label>
      <input type="text" className={`${status[onStatus]} outline-1 rounded-sm py-2 pl-4 text-xs font-medium leading-6 `} placeholder="Enter task name" />
    </div>

  )
}

export default TextInputItem
