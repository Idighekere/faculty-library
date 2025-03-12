import { features } from "@/constants"


export default function Features({
  title = "Library Features",
  description = "Our engineering library offers a range of features to enhance your academic experience.",

}) {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/30 flex flex-col items-center md:px-12 lg:px-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{title}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
