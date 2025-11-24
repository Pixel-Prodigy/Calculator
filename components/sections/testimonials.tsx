import { testimonials } from '@/constants/testimonials';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TestimonialsSection() {
  return (
    <section className="container space-y-8 py-24">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Signals</p>
        <h3 className="text-3xl font-semibold text-white">Loved by finance, product, and education teams.</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="space-y-4 border-white/5 bg-white/5">
            <p className="text-sm text-white/80">{testimonial.quote}</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{testimonial.avatarInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-white">{testimonial.author}</p>
                <p className="text-xs text-white/50">{testimonial.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
