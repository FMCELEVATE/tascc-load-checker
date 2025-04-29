const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbze1DEQHOsq7XNFHhMqBIt9cQsd4ecDFtcOK3wmTrVNlxP0KE2ekIEAtS_BTMpvQh8P/exec";
async function searchTrailer() {
  const input = document.getElementById('trailerSearch');
  const trailer = input.value.trim().toUpperCase();
  const resultsDiv = document.getElementById('trailerResults');
  resultsDiv.innerHTML = 'Searching...';

  if (!trailer) {
    resultsDiv.innerHTML = '<p>Please enter a trailer number.</p>';
    return;
  }

  try {
    const response = await fetch(`${SCRIPT_URL}?trailer=${encodeURIComponent(trailer)}`);
    const data = await response.json();

    if (!data.loads || data.loads.length === 0) {
      resultsDiv.innerHTML = `<p>No records found for trailer <strong>${trailer}</strong>.</p>`;
      return;
    }

    const html = data.loads.map(load => `
      <div class="load-entry">
        <p><strong>Date:</strong> ${load.date}</p>
        <p><strong>Commodity:</strong> ${load.commodity}</p>
        <p><strong>Weight:</strong> ${load.weight}</p>
      </div>
    `).join('');
    resultsDiv.innerHTML = html;
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = '<p>Error retrieving trailer history.</p>';
  }
}
