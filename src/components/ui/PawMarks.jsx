const paws = [
  { className: 'left-[7%] top-[18%] h-8 w-8', delay: '0s', duration: '5.5s' },
  { className: 'right-[14%] top-[28%] h-6 w-6', delay: '1.1s', duration: '6.4s' },
  { className: 'left-[18%] bottom-[16%] h-5 w-5', delay: '2s', duration: '7s' },
  { className: 'right-[8%] bottom-[22%] h-7 w-7', delay: '0.6s', duration: '5.8s' },
]

export default function PawMarks({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {paws.map((paw) => (
        <svg
          key={paw.className}
          viewBox="0 0 24 24"
          className={`paw fill-current ${paw.className}`}
          style={{ animationDelay: paw.delay, animationDuration: paw.duration }}
        >
          <ellipse cx="7" cy="7" rx="2.2" ry="2.8" />
          <ellipse cx="12" cy="5" rx="2.2" ry="2.8" />
          <ellipse cx="17" cy="7" rx="2.2" ry="2.8" />
          <ellipse cx="5.5" cy="11.5" rx="1.8" ry="2.3" />
          <path d="M12 22c-4.2 0-7-3.2-7-6.4 0-2.6 2-4.6 5.2-5.1 1.9 2.4 5.7 2.4 7.6 0 3.2.5 5.2 2.5 5.2 5.1 0 3.2-2.8 6.4-7 6.4z" />
        </svg>
      ))}
    </div>
  )
}
