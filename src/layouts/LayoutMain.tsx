import LayoutFooter from './LayoutFooter'
import LayoutHeader from './LayoutHeader'

export default function LayoutMain({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <LayoutHeader />
      <main>{children}</main>
      <LayoutFooter />
    </div>
  )
}
