import { steps } from "@/constants";

export default function HowItWorks({
  title = "How It Works",
  description = "Follow these simple steps to find and access the engineering courses you need.",

}) {
  return (
    <section className="w-full py-12 md:py-24 bg-background flex flex-col justify-center items-center md:px-12 lg:px-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{title}</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">{description}</p>
        </div>

        <div className="grid gap-12 md:gap-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
            >
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {step.image && (
                <div className="flex-1 w-full">
                  <div className="relative overflow-hidden rounded-lg border shadow-sm">
                    <img
                      src={step.image || "/placeholder.svg"}
                      alt={`Step ${step.number}: ${step.title}`}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-sm font-medium">{step.title}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
