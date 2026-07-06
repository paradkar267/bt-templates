const str = 'href="/previews/wealth-management-homepage/_next/static/"'; 
console.log(str.replace(/href="\/(?!previews\/)([^"]*)"/g, 'X'));
