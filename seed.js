const careers = [
  { title: 'Software Engineering', description: 'Build scalable software systems and web/mobile applications driving the digital world.' },
  { title: 'AI / Machine Learning', description: 'Design intelligent systems that learn and evolve, powering the next generation of products.' },
  { title: 'Data Science & Analytics', description: 'Turn raw data into powerful business insights using statistical and visualization tools.' },
  { title: 'UI/UX Design', description: 'Craft beautiful digital experiences that delight users and solve real-world problems.' },
  { title: 'Cyber Security Analyst', description: 'Protect organizations from cyber threats and ensure data integrity securely.' },
  { title: 'Cloud Architect', description: 'Design and manage large scale cloud infrastructure deployments securely and safely.' },
  { title: 'Product Manager', description: 'Lead cross-functional teams to build products that solve core user problems.' },
  { title: 'Game Developer', description: 'Develop interactive gaming experiences using advanced physics and graphics engines.' }
];

async function seed() {
  for (const c of careers) {
    try {
      const res = await fetch('http://localhost:8081/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(c)
      });
      console.log(`Added: ${c.title}`);
    } catch(e) {
      console.error(e);
    }
  }
}
seed();
