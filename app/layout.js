
import BoardProvider from './_context/BoradContext';
import './_style/style.css'
import boardData from '@/app/_data/data.json'

import { Plus_Jakarta_Sans } from "next/font/google";
export const metadata = {
  title: 'Kanban App',
};
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
})



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} antialiased`}
      >
        <BoardProvider initialData={boardData}>
          {children}
        </BoardProvider>
      </body>
    </html>
  );
}
