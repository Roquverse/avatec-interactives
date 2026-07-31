export const Icon = ({
  d,
  size = 20,
  stroke = 'currentColor',
  fill = 'none',
}: {
  d: string
  size?: number
  stroke?: string
  fill?: string
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
)
