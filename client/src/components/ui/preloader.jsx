import { cn } from "@/lib/utils"

/**
 * Preloader component that can be used during page loading and authentication checks
 *
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the preloader (sm, md, lg)
 * @param {string} props.message - Optional message to display below the preloader
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fullScreen - Whether the preloader should take up the full screen
 */
function Preloader({ size = "md", message='', className, fullScreen = false, ...props }) {
  // Size mappings
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-16 w-16 border-4",
  }

  // Container classes based on fullScreen prop
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-4"

  return (
    <div className={cn(containerClasses, className)} {...props}>
      <div
        className={cn(
          "animate-spin rounded-full border-primary border-t-transparent",
          sizeClasses[size] || sizeClasses.md,
        )}
      />
      {message && <p className="mt-4 text-center text-muted-foreground">{message}</p>}
    </div>
  )
}

export default Preloader
