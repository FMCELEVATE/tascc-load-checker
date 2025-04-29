
window.onload = function() {
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
  }, 1000);
};

function searchTrailer() {
  const trailerId = document.getElementById('trailerSearch').value;
  const resultBox = document.getElementById('trailerResults');
  fetch(`YOUR_APPS_SCRIPT_WEBAPP_URL_HERE?trailer=${trailerId}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        resultBox.innerHTML = "<p>No records found for this trailer.</p>";
      } else {
        let html = "<ul>";
        data.forEach(entry => {
          html += `<li>${entry.date}: ${entry.load}</li>`;
        });
        html += "</ul>";
        resultBox.innerHTML = html;
      }
    })
    .catch(err => {
      resultBox.innerHTML = "<p>Error retrieving trailer history.</p>";
    });
}
