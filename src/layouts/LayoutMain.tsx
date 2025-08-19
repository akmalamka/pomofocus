import LayoutHeader from './LayoutHeader'

export default function LayoutMain({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LayoutHeader />
      <main>{children}</main>
    </div>
  )
}
