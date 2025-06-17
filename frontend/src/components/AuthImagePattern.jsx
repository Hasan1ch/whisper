/**
 * AuthImagePattern Component
 *
 * Decorative visual component used on authentication pages (Login/Signup)
 * Creates an animated grid pattern with customizable title and subtitle text
 *
 * Design Features:
 * - 3x3 grid of animated squares for visual appeal
 * - Responsive design (hidden on mobile, visible on large screens)
 * - Staggered pulse animations for dynamic effect
 * - Customizable content via props
 * - Consistent styling with app theme
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.title - Main heading text to display
 * @param {string} props.subtitle - Descriptive text below the title
 * @author Hassan Abdukadirov
 */

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    // Main container - hidden on mobile/tablet, visible on large screens (lg:)
    // Uses flexbox for centering content and base-200 background color
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      {/* Content wrapper with max width and center alignment */}
      <div className="max-w-md text-center">
        {/* Animated grid pattern section */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {/* Generate 9 squares using Array mapping */}
          {[...Array(9)].map((_, i) => (
            <div
              key={i} // Unique key for each grid item
              className={`aspect-square rounded-2xl bg-primary/20 opacity-80 ${
                // Add pulse animation to every other square (even indices)
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
              style={{
                // Fallback background color for better browser compatibility
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                // Stagger animation timing for cascading effect
                // Each square starts animation slightly after the previous one
                animationDelay: `${i * 0.01}s`,
              }}
            />
          ))}
        </div>

        {/* Main title text - large, bold, with bottom margin */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        {/* Subtitle text - smaller, muted color for hierarchy */}
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
