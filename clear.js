async function wipe() {
  const mentors = await (await fetch('http://localhost:8081/mentors')).json();
  for (let m of mentors) {
    await fetch(`http://localhost:8081/mentors/${m.id}`, {method: 'DELETE'});
    console.log('Deleted mentor', m.id);
  }
  const careers = await (await fetch('http://localhost:8081/careers')).json();
  for (let c of careers) {
    await fetch(`http://localhost:8081/careers/${c.id}`, {method: 'DELETE'});
    console.log('Deleted career', c.id);
  }
}
wipe();
