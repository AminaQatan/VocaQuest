import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title:'VocaQuest · L2 English Adventure',
  description:'Explore six worlds of vocational English with platform adventures, learning challenges and feedback. Created for Level 2 by Ms. Amina Qatan.',
  manifest:'/manifest.webmanifest',
  icons:{icon:'/favicon.svg',apple:'/icon-192.png'},
  appleWebApp:{capable:true,title:'VocaQuest',statusBarStyle:'default'},
};
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#5b21b6'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
