
import ModalManager from './_components/modal/ModalManager';
import BoardProvider from './_context/BoradContext';
import { ModalProvider } from './_context/ModalContext';
import './_style/style.css'
import boardData from '@/app/_data/data.json'

import { Plus_Jakarta_Sans } from "next/font/google";
import { normalizeData } from './_lib/helpers';



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
        <BoardProvider initialData={normalizeData(boardData)}>
          <ModalProvider>
            {children}
            <ModalManager />
          </ModalProvider>
        </BoardProvider>
      </body>
    </html>
  );
}
