import useDarkMode from "@/app/_hooks/useDarkMode";

function SliderBtn() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const handleToggle = () => {
    setIsDarkMode(prev => !prev);
  };
  return (
    <label className="switch">
      <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
      <span className="slider">
      </span>
    </label>
  )
}

export default SliderBtn
