import Typography from '@mui/material/Typography'
import LayoutFooter from './LayoutFooter'
import LayoutHeader from './LayoutHeader'

export default function LayoutMain({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex-col relative hidden md:flex">
        <LayoutHeader />
        <main>{children}</main>
        <LayoutFooter />
      </div>
      <div className=" flex flex-col h-[100dvh] items-center justify-center text-center md:hidden">
        <img src="/logo.svg" alt="Pomofocus Logo" className="h-[64px]" />
        <Typography color="creme" variant="body1">
          Use a desktop to access this app.
        </Typography>
      </div>
    </>

  )
}
