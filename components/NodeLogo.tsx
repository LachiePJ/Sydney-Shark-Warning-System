export default function NodeLogo({ className = "h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Connected circles network */}
      <circle cx="30" cy="20" r="12" fill="currentColor"/>
      <circle cx="70" cy="20" r="12" fill="currentColor"/>
      <circle cx="30" cy="60" r="12" fill="currentColor"/>
      <circle cx="70" cy="60" r="12" fill="currentColor"/>
      
      {/* Connection lines */}
      <line x1="30" y1="20" x2="70" y2="20" stroke="currentColor" strokeWidth="4"/>
      <line x1="30" y1="20" x2="30" y2="60" stroke="currentColor" strokeWidth="4"/>
      <line x1="70" y1="20" x2="70" y2="60" stroke="currentColor" strokeWidth="4"/>
      <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="4"/>
      <line x1="30" y1="20" x2="70" y2="60" stroke="currentColor" strokeWidth="4"/>
      <line x1="70" y1="20" x2="30" y2="60" stroke="currentColor" strokeWidth="4"/>
      
      {/* Text */}
      <text x="100" y="35" fontSize="28" fontWeight="700" fill="currentColor">node.</text>
      <text x="100" y="63" fontSize="20" fontWeight="400" fill="currentColor" opacity="0.8">strategy</text>
    </svg>
  );
}
