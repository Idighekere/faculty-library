import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"

/**
 * TableLegend component to display explanations for abbreviations or codes
 *
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of legend items with shortName and fullName
 * @param {string} props.title - Optional title for the legend
 * @param {string} props.className - Additional CSS classes
 */
function TableLegend({ items = [], title = "Legend", className, ...props }) {
  if (!items.length) return null

  return (
    <Card className={cn("mt-4 p-4", className)} {...props}>
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        <Info className="h-4 w-4 text-muted-foreground" />
        {title}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <Badge variant="outline" className="font-mono">
              {item.shortName}
            </Badge>
            <span className="text-sm text-muted-foreground">{item.name}</span>
            {index < items.length - 1 && <span className="text-muted-foreground/40 mx-1">•</span>}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default TableLegend
