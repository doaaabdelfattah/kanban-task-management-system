'use client'

import { useBoard } from '@/app/_context/BoradContext'

function SideBarList({ setIsSideMobile }) {
  const { data, selectedBoardName, setSelectedBoardName } = useBoard();

  const handleClick = (boardName) => {
    setSelectedBoardName(boardName);
    if (window.innerWidth < 768) {
      setIsSideMobile(false);
    }

  }

  return (
    <div className="flex-1 ">
      <h2 className='mt-4 px-8 uppercase text-medium-grey text-xs tracking-[2.4px] font-bold'>
        All boards (3)
      </h2>
      <ul className=' mt-5 mr-6'>
        {data.boards.map(board => (
          <li className={`w-full text-left pl-8 heading-md rounded-r-full flex items-center gap-4 py-4 cursor-pointer ${board.name === selectedBoardName
            ? 'bg-main-purple text-white'
            : ' text-medium-grey hover:bg-main-purple/10 dark:hover:bg-white group dark:hover:text-main-purple'
            }`}
            onClick={() => handleClick(board.name)}
            key={board.name}
          >
            <svg className={`group-hover:text-main-purple ${board.name === selectedBoardName
              ? 'text-primary-white'
              : 'text-medium-grey '
              }`} width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill='currentColor' /></svg>
            <span className='group-hover:text-main-purple'> {board.name}</span>
          </li>
        ))}
        <li className='text-main-purple w-full text-left pl-8 heading-md  flex items-center gap-4  py-4 cursor-pointer'>
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill='#635fc7' /></svg>
          + Create New Board

        </li>
      </ul>


    </div>
  )
}

export default SideBarList;
