import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { agents, properties } from '../data/mockData';
import PropertyCard from '../components/PropertyCard';

export default function AgentProfile() {
  const { id } = useParams();
  const agent = agents.find(a => a.id === id);
  const agentProperties = properties.filter(p => p.agentId === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!agent) return <div className="pt-32 text-center text-2xl font-serif">Agent not found.</div>;

  return (
    <div className="pt-24 min-h-screen">
      {/* Agent Header */}
      <div className="container mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <img 
            src={agent.image} 
            alt={agent.name}
            className="w-full aspect-[3/4] object-cover"
          />
        </div>
        
        <div className="w-full md:w-2/3">
          <h1 className="text-5xl md:text-6xl font-serif mb-4 font-light">{agent.name}</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-10 font-medium">{agent.title}</p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 mb-12 pb-12 border-b border-border/40 text-primary/80">
            <a href={`tel:${agent.phone}`} className="flex items-center space-x-4 hover:text-accent transition-colors duration-300">
              <Phone size={16} className="text-accent" /> <span className="font-light tracking-wide">{agent.phone}</span>
            </a>
            <a href={`mailto:${agent.email}`} className="flex items-center space-x-4 hover:text-accent transition-colors duration-300">
              <Mail size={16} className="text-accent" /> <span className="font-light tracking-wide">{agent.email}</span>
            </a>
            <div className="flex items-center space-x-4">
              <MapPin size={16} className="text-accent" /> <span className="font-light tracking-wide">Global Network</span>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-6 font-medium">About {agent.name.split(' ')[0]}</h2>
            <p className="text-lg md:text-xl text-primary/80 font-light leading-relaxed max-w-3xl">
              {agent.bio}
            </p>
          </div>

          <div className="bg-muted/30 border border-border/40 p-10 md:p-14">
            <h3 className="text-3xl font-serif mb-8 font-light text-primary">Contact {agent.name.split(' ')[0]}</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder="FIRST NAME" className="w-full bg-transparent border-b border-border/50 p-4 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground" />
                <input type="text" placeholder="LAST NAME" className="w-full bg-transparent border-b border-border/50 p-4 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground" />
              </div>
              <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-border/50 p-4 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground" />
              <input type="tel" placeholder="PHONE NUMBER" className="w-full bg-transparent border-b border-border/50 p-4 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground" />
              <textarea placeholder="HOW CAN I HELP YOU?" rows="4" className="w-full bg-transparent border-b border-border/50 p-4 text-[11px] uppercase tracking-[0.1em] font-light outline-none focus:border-accent transition-colors duration-500 placeholder:text-muted-foreground resize-none"></textarea>
              <button type="submit" className="bg-primary hover:bg-accent hover:shadow-xl hover:-translate-y-1 text-white uppercase tracking-[0.2em] text-[10px] font-medium py-5 px-10 transition-all duration-500 ease-luxury mt-4 inline-block">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Agent's Listings */}
      {agentProperties.length > 0 && (
        <div className="border-t border-border/40 mt-16 py-24 px-6 md:px-12 bg-muted/20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex justify-between items-end mb-12 border-b border-border/30 pb-6">
              <h2 className="text-4xl font-serif text-primary font-light">Current Listings</h2>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">{agentProperties.length} Properties</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {agentProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
