<script setup>
import { ref } from 'vue'

const menuItems = ['Overview', 'Analytics', 'Customers', 'Products', 'Orders', 'Settings']
const activeMenu = ref('Overview')

const stats = [
  { label: 'Total Revenue', value: '$45,231', trend: '+20.1%' },
  { label: 'Active Users', value: '2,405', trend: '+12.5%' },
  { label: 'New Orders', value: '340', trend: '-2.4%' },
  { label: 'Conversion Rate', value: '3.24%', trend: '+4.1%' }
]
</script>

<template>
  <div class="flex h-screen bg-slate-100 font-sans">
    
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col">
      <div class="h-16 flex items-center px-6 border-b border-slate-800 font-bold text-xl tracking-tight">
        <span class="text-indigo-400 mr-2">✦</span> VueAdmin
      </div>
      <div class="flex-1 py-6 overflow-y-auto">
        <nav class="space-y-1 px-3">
          <button 
            v-for="item in menuItems" 
            :key="item"
            @click="activeMenu = item"
            :class="[
              'w-full text-left px-3 py-2.5 rounded-lg transition-colors text-sm font-medium',
              activeMenu === item ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            ]"
          >
            {{ item }}
          </button>
        </nav>
      </div>
      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-slate-700"></div>
          <div>
            <div class="text-sm font-medium">Jane Doe</div>
            <div class="text-xs text-slate-400">Admin</div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <h1 class="text-2xl font-semibold text-slate-800">{{ activeMenu }}</h1>
        <div class="flex space-x-4">
          <input type="text" placeholder="Search..." class="px-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <button class="w-10 h-10 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center">
            🔔
          </button>
        </div>
      </header>

      <!-- Content Area -->
      <div class="flex-1 overflow-y-auto p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div class="text-sm font-medium text-slate-500 mb-1">{{ stat.label }}</div>
            <div class="flex items-end justify-between">
              <div class="text-3xl font-bold text-slate-800">{{ stat.value }}</div>
              <div :class="stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'" class="text-sm font-medium">
                {{ stat.trend }}
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[400px]">
          <h2 class="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {{ i }}
                </div>
                <div>
                  <div class="text-sm font-medium text-slate-800">User created a new report</div>
                  <div class="text-xs text-slate-500">2 hours ago</div>
                </div>
              </div>
              <button class="text-sm text-indigo-600 font-medium hover:text-indigo-800">View</button>
            </div>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>
