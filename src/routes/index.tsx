import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import campaignImage from "@/assets/storefront-campaign.jpg";
import { Button } from "@/components/ui/button";
import { CategoryTiles, HomeCollection } from "@/components/storefront/product-ui";
import { demoProducts } from "@/data/demo-products";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Abayas & Jalabayas | Modest fashion in Jos" }, { name: "description", content: "Explore thoughtfully selected abayas, jalabiyas, hijabs and accessories from Jos, Nigeria." }, { property: "og:title", content: "Abayas & Jalabayas | Modest fashion in Jos" }, { property: "og:description", content: "Explore thoughtfully selected abayas, jalabiyas, hijabs and accessories from Jos, Nigeria." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: HomePage,
});

function HomePage() {
  return <>
    <section className="relative isolate min-h-[590px] overflow-hidden bg-charcoal sm:min-h-[660px] lg:min-h-[710px]">
      <img src={campaignImage} alt="Olive embroidered abaya in the late afternoon light" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 size-full object-cover object-[62%_center]" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/30 to-transparent" />
      <div className="relative mx-auto flex min-h-[590px] max-w-[1440px] items-center px-6 py-16 sm:min-h-[660px] sm:px-12 lg:min-h-[710px] lg:px-20"><div className="max-w-[570px] text-cream"><p className="text-[10px] font-semibold tracking-[0.22em] sm:text-xs">MODESTLY, BEAUTIFULLY YOU</p><h1 className="editorial-heading mt-5 text-5xl sm:text-6xl lg:text-[76px]">A little more<br/>you, in every<br/><span className="italic text-gold-soft">moment.</span></h1><p className="mt-5 max-w-sm text-sm leading-6 text-cream/85 sm:text-base">Thoughtfully chosen abayas, jalabiyas and finishing touches—right here in Jos.</p><Button asChild variant="secondary" className="mt-8 h-12 px-6"><Link to="/shop" search={{ q: "" }}>Discover the collection <ArrowRight size={16}/></Link></Button><p className="mt-7 text-[10px] tracking-[0.12em] text-cream/70"><Sparkles className="mr-2 inline size-3 text-gold"/>A collection chosen with care</p></div></div>
      <div className="absolute bottom-0 right-0 hidden h-1/3 w-[32%] border-l border-t border-cream/25 bg-cream/10 p-7 text-cream/80 backdrop-blur-sm lg:block"><p className="text-[9px] tracking-[0.19em]">FROM OUR HOME</p><p className="mt-2 font-display text-2xl">Jos, Plateau State</p><p className="mt-2 text-xs">Made for your moments, near and far.</p></div>
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-14"><HomeCollection eyebrow="THE PIECES WE LOVE" heading="A few favourites" products={demoProducts.filter((p) => p.featured).slice(0, 4)}/></section>
    <section className="bg-cream/40"><div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-10 sm:py-16 lg:px-14"><div className="mb-7"><p className="text-[9px] font-semibold tracking-[0.19em] text-gold">FIND YOUR KIND OF LOVELY</p><h2 className="editorial-heading mt-2 text-3xl sm:text-4xl">Shop by feeling</h2></div><CategoryTiles/></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-14"><HomeCollection eyebrow="FRESHLY ARRIVED" heading="New, and lovely" products={demoProducts.filter((p) => p.isNew).slice(0, 4)}/></section>
    <section className="relative isolate overflow-hidden bg-charcoal text-cream"><div className="mx-auto grid max-w-[1440px] items-center gap-7 px-6 py-10 sm:grid-cols-[1fr_auto] sm:px-12 sm:py-12 lg:px-20"><div><p className="text-[9px] font-semibold tracking-[0.2em] text-gold">A LITTLE SOMETHING SPECIAL</p><h2 className="editorial-heading mt-2 text-3xl sm:text-4xl">Something lovely is waiting.</h2><p className="mt-3 max-w-xl text-sm text-cream/70">Explore the collection and find a piece that feels like it was always yours.</p></div><Button asChild variant="secondary" className="w-fit"><Link to="/shop" search={{ q: "" }}>Shop the collection <ArrowRight/></Link></Button></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-14 text-center sm:px-10 lg:px-14"><p className="text-[9px] font-semibold tracking-[0.19em] text-gold">A NOTE FROM JOS</p><p className="mx-auto mt-3 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">“A beautiful piece is not only what you wear—it is how you feel when you put it on.”</p><Link to="/contact" className="mt-5 inline-block border-b border-gold pb-1 text-xs">Come say hello <ArrowRight className="ml-1 inline size-3"/></Link></section>
  </>;
}