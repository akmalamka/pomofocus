import type { ButtonProps } from '@mui/material/Button'
import Button from '@mui/material/Button'
import './core.button.css'

interface CoreButtonProps extends ButtonProps {
  title: string
}

export default function CoreButton(props: CoreButtonProps) {
  const { title, ...muiProps } = props
  return (
    <Button
      {...muiProps}
      className="group"
      sx={{
        ...(muiProps.sx || {}),
      }}
    >
      <span
        className="relative overflow-hidden"
      >
        <span
          className="button-content block translate-y-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-100%"
          data-title={title}
        >
          { title }
        </span>
      </span>
    </Button>
  )
}
