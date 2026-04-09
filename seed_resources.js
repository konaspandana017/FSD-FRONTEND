const resources = [
  { title: 'Complete Web Development Bootcamp 2024', type: 'Course', url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/' },
  { title: 'Data Structures and Algorithms in Java', type: 'Video Playlist', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjoG6aJ49_DccGE1sK7T_E5' },
  { title: 'AWS Cloud Practitioner Study Guide', type: 'Documentation', url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/' },
  { title: 'Figma UI/UX Masterclass', type: 'Interactive Tutorial', url: 'https://www.figma.com/resources/learn/' },
  { title: 'Crack the Product Manager Interview', type: 'Article', url: 'https://www.productschool.com/blog/product-management-2/product-manager-interview-questions/' },
  { title: 'Intro to Ethical Hacking and Cybersecurity', type: 'Video', url: 'https://www.youtube.com/watch?v=3Kq1MIfIGCE' }
];

async function seed() {
  for (const r of resources) {
    try {
      await fetch('http://localhost:8081/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(r)
      });
      console.log(`Added: ${r.title}`);
    } catch(e) {
      console.error(e);
    }
  }
}
seed();
