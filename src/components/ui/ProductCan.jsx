export default function ProductCan({ color = '#68b738', accent = '#b4e08a', label = 'PRO', compact = false }) {
  return (
    <span className={`inline-block ${compact ? '' : 'animate-float group-hover:[animation-play-state:paused]'}`}>
      <svg
        viewBox="0 0 140 190"
        className={`drop-shadow-[0_8px_12px_rgb(17_17_17_/_0.16)] ${
          compact
            ? 'h-20 w-14'
            : 'h-40 w-28 transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-[-8deg] group-hover:scale-110 md:h-44 md:w-32'
        }`}
        aria-hidden="true"
      >
      <ellipse cx="70" cy="22" rx="42" ry="12" fill={accent} />
      <path d="M28 22v130c0 14 18.8 26 42 26s42-12 42-26V22z" fill={color} />
      <ellipse cx="70" cy="22" rx="42" ry="12" fill={accent} opacity="0.9" />
      <rect x="38" y="48" width="64" height="72" rx="6" fill="#111" />
      <rect x="44" y="54" width="52" height="40" rx="4" fill={color} />
      <text
        x="70"
        y="78"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Oswald, sans-serif"
        fontSize="13"
        letterSpacing="1.5"
      >
        {label}
      </text>
      <text
        x="70"
        y="108"
        textAnchor="middle"
        fill="#f2f2f2"
        fontFamily="Oswald, sans-serif"
        fontSize="8"
        letterSpacing="1"
      >
        CAT ENERGY
      </text>
      <ellipse cx="70" cy="152" rx="42" ry="12" fill="#111" opacity="0.18" />
      </svg>
    </span>
  )
}
