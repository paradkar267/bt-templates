import React from "react";
import { Carousel, TestimonialCard } from "./retro-testimonial";

const testimonialData = {
	ids: [
		"e60aa346-f6da-11ed-b67e-0242ac120002",
		"e60aa346-f6da-11ed-b67e-0242ac120003",
		"e60aa346-f6da-11ed-b67e-0242ac120004",
		"e60aa346-f6da-11ed-b67e-0242ac120005",
		"e60aa346-f6da-11ed-b67e-0242ac120006",
		"e60aa346-f6da-11ed-b67e-0242ac120007",
	],
	details: {
		"e60aa346-f6da-11ed-b67e-0242ac120002": {
			id: "e60aa346-f6da-11ed-b67e-0242ac120002",
			description:
				"Bizleap's templates have revolutionized our development workflow. The pre-built components are highly customizable and have saved us countless hours of development time.",
			profileImage:
				"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
			name: "Sarah Chen",
			designation: "Senior Frontend Developer",
		},
		"e60aa346-f6da-11ed-b67e-0242ac120003": {
			id: "e60aa346-f6da-11ed-b67e-0242ac120003",
			description:
				"As a startup founder, I needed a quick way to build a professional-looking product. These UI Kits were exactly what I needed. The quality is simply production-ready.",
			profileImage:
				"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
			name: "Michael Rodriguez",
			designation: "Founder, TechStart",
		},
		"e60aa346-f6da-11ed-b67e-0242ac120004": {
			id: "e60aa346-f6da-11ed-b67e-0242ac120004",
			description:
				"The attention to detail in these components is impressive. From accessibility features to responsive design, everything is well thought out. An essential part of our tech stack.",
			profileImage:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
			name: "David Kim",
			designation: "UI/UX Lead",
		},
		"e60aa346-f6da-11ed-b67e-0242ac120005": {
			id: "e60aa346-f6da-11ed-b67e-0242ac120005",
			description:
				"What sets this marketplace apart is its flexibility. We've been able to maintain consistency across our applications while customizing components to match our brand.",
			profileImage:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
			name: "Emily Thompson",
			designation: "Product Designer",
		},
		"e60aa346-f6da-11ed-b67e-0242ac120006": {
			id: "e60aa346-f6da-11ed-b67e-0242ac120006",
			description:
				"The performance optimization in these templates is outstanding. We've seen significant improvements in load times and overall user experience since implementing them.",
			profileImage:
				"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
			name: "James Wilson",
			designation: "Performance Engineer",
		},
		"e60aa346-f6da-11ed-b67e-0242ac120007": {
			id: "e60aa346-f6da-11ed-b67e-0242ac120007",
			description:
				"The community support and regular updates make this marketplace a reliable choice for our projects. Highly recommend to any modern development team.",
			profileImage:
				"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&auto=format&fit=crop",
			name: "Sophia Martinez",
			designation: "Full Stack Developer",
		},
	},
};

export function TestimonialsSection() {
	const cards = testimonialData.ids.map((cardId, index) => {
		const details = testimonialData.details[cardId];
		return (
			<TestimonialCard
				key={cardId}
				testimonial={details}
				index={index}
				layout={true}
				backgroundImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
			/>
		);
	});

	return (
		<section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none"></div>
			<div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-900 border border-black/[0.06] mb-6 shadow-sm">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
             </span>
             <span className="text-sm font-bold tracking-wide uppercase text-gray-800 dark:text-gray-200">Wall of Love</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-gray-100 mb-6">
            Trusted by creators
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium">
            Join thousands of developers and designers who build faster with Bizleap.
          </p>
        </div>
				<Carousel items={cards} />
			</div>
		</section>
	);
}
