function CheckBoxItem({ task, status, onToggle }) {
  return (
    <>
      <label className="form-control bg-light-grey rounded-sm p-3 font-bold text-sm text-primary-black hover:bg-main-purple/25 cursor-pointer mb-2 w-full dark:bg-very-dark-grey dark:text-medium-grey">
        <input type="checkbox" id="check" className="peer hidden custom-checkbox" checked={status} onChange={onToggle} />
        <span className="peer-checked:line-through peer-checked:text-opacity-25 peer-checked:decoration-1">
          {task}
        </span>
      </label>
    </>
  )
}
export default CheckBoxItem;
