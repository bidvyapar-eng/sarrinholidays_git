import { ArrowUpRight } from "lucide-react"

type Package = {
  id: string
  country: string
  title: string
  duration: string
  description: string
  price: string
  image: string
  imageAlt: string
}

const packages: Package[] = [
  {
    id: "amalfi",
    country: "Italy",
    title: "Amalfi Coast Curation",
    duration: "7 Days / 6 Nights",
    description:
      "Private cliffside villas, chartered sunset sails, and Michelin-starred coastal dining along the Tyrrhenian.",
    price: "From $4,200",
    image: "/package-amalfi.png",
    imageAlt: "Pastel villages cascading down the Amalfi Coast cliffs above a turquoise sea",
  },
  {
    id: "kyoto",
    country: "Japan",
    title: "Kyoto Hidden Pavilions",
    duration: "6 Days / 5 Nights",
    description:
      "Dawn temple access, a private tea ceremony, and quiet ryokan stays among the maple-lined pavilions.",
    price: "From $5,800",
    image: "/package-kyoto.png",
    imageAlt: "A traditional Kyoto temple pavilion reflected in a still pond at misty dawn",
  },
  {
    id: "serengeti",
    country: "Tanzania",
    title: "Serengeti Private Safari",
    duration: "8 Days / 7 Nights",
    description:
      "Exclusive-use camps, guided golden-hour game drives, and a hot-air balloon crossing over the savanna.",
    price: "From $9,400",
    image: "/package-serengeti.png",
    imageAlt: "Acacia trees silhouetted against an amber Serengeti sky at golden hour",
  },
]

export function PackagesGrid() {
  return (
    <section id="destinations" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Sarrinholidays</span>
        <h2 className="mt-3 text-balance font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
          Signature curated journeys
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-foreground/70">
          Each itinerary is handcrafted end to end, blending rare access with effortless luxury.
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <li key={pkg.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-white/8 shadow-xl shadow-black/30 backdrop-blur-xl transition-colors hover:border-white/25">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.imageAlt}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-gradient-to-r from-primary/90 to-primary/70 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-md">
                  {pkg.duration}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{pkg.country}</span>
                <h3 className="mt-2 font-serif text-2xl leading-snug tracking-tight text-foreground">{pkg.title}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/70">{pkg.description}</p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-foreground">{pkg.price}</span>
                    <span className="text-xs text-foreground/55">per planner</span>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95">
                    View Itinerary
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
