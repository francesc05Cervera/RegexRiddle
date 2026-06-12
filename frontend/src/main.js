import './style.css';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>RegexRiddle</h1>
    <p>Primo test frontend + backend</p>
    <button id="test-btn">Test backend</button>
    <pre id="output"></pre>
  </div>
`;

document.querySelector('#test-btn').addEventListener('click', async () => {
  const output = document.querySelector('#output');

  try {
    const response = await fetch('http://localhost:3000/api/health');
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    output.textContent = 'Errore: ' + error.message;
  }
});