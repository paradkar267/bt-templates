<script>
  let cart = 0;
  
  const products = [
    { id: 1, name: 'Minimalist Watch', price: 199, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', category: 'Accessories' },
    { id: 2, name: 'Leather Tote Bag', price: 149, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', category: 'Bags' },
    { id: 3, name: 'Ceramic Vase', price: 89, image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80', category: 'Home' },
    { id: 4, name: 'Wireless Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', category: 'Tech' },
  ];

  function addToCart() {
    cart += 1;
  }
</script>

<main class="min-h-screen bg-stone-50 font-sans text-stone-900">
  <!-- Navbar -->
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="text-xl font-bold tracking-tight">VÉLURE</div>
      <nav class="hidden md:flex space-x-8 text-sm font-medium text-stone-500">
        <a href="#" class="hover:text-stone-900">New Arrivals</a>
        <a href="#" class="hover:text-stone-900">Women</a>
        <a href="#" class="hover:text-stone-900">Men</a>
        <a href="#" class="hover:text-stone-900">Home</a>
      </nav>
      <div class="flex items-center space-x-6">
        <button class="text-stone-500 hover:text-stone-900">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        <button class="text-stone-500 hover:text-stone-900 relative">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          {#if cart > 0}
            <span class="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cart}
            </span>
          {/if}
        </button>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="max-w-7xl mx-auto px-6 py-12 md:py-20">
    <div class="bg-stone-200 rounded-3xl h-[60vh] relative overflow-hidden flex items-center">
      <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80" alt="Hero" class="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div class="relative z-10 p-10 md:p-20 max-w-2xl">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">Autumn <br/>Collection</h1>
        <p class="text-lg md:text-xl text-stone-800 mb-8 max-w-md">Discover our new arrival of minimalist essentials designed for everyday living.</p>
        <button class="bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition">Shop Now</button>
      </div>
    </div>
  </section>

  <!-- Products -->
  <section class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex justify-between items-end mb-10">
      <h2 class="text-3xl font-bold tracking-tight">Trending Now</h2>
      <a href="#" class="text-sm font-medium text-stone-500 hover:text-stone-900 underline underline-offset-4">View All</a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each products as product}
        <div class="group cursor-pointer">
          <div class="aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden mb-4 relative">
            <img src={product.image} alt={product.name} class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            <button 
              on:click={addToCart}
              class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-stone-900 px-6 py-3 rounded-full font-medium text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-stone-100"
            >
              Add to Cart
            </button>
          </div>
          <div class="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">{product.category}</div>
          <h3 class="text-lg font-bold text-stone-900">{product.name}</h3>
          <p class="text-stone-500 mt-1">${product.price}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-stone-200 mt-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4">VÉLURE</h2>
        <p class="text-stone-500 text-sm max-w-sm mx-auto">Sustainable, minimalist essentials for the modern wardrobe.</p>
      </div>
    </div>
  </footer>
</main>
