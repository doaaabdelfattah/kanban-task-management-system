function CheckBoxItem() {
  return (
    <>
      <label className="form-control bg-light-grey rounded-sm p-3 font-bold text-sm text-primary-black w-fit hover:bg-main-purple/25 cursor-pointer mb-2">
        <input type="checkbox" id="check" className="peer hidden custom-checkbox" />

        <span className="peer-checked:line-through peer-checked:text-opacity-25 peer-checked:decoration-1">
          Build UI for onboarding flow
        </span>
      </label>

    </>
  )
}
export default CheckBoxItem;
