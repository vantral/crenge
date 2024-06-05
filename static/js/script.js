document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        fetch(`/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            });
    });

    function displayResults(data) {
        resultsDiv.innerHTML = '';
        if (data.length === 0) {
            resultsDiv.innerHTML = '<p>No results found</p>';
            return;
        }
        data.forEach(example => {
            const exampleDiv = document.createElement('div');
            exampleDiv.classList.add('example');
            exampleDiv.innerHTML = `
                <p><strong>Nominal Marking:</strong> ${example.nominal_marking}</p>
                <p><strong>Adposition:</strong> ${example.adposition}</p>
                <p><strong>Flag on Adposition:</strong> ${example.flag_on_adposition}</p>
                <p><strong>Directional Meaning:</strong> ${example.directional_meaning}</p>
                <p><strong>Spatial Domain:</strong> ${example.spatial_domain}</p>
                <p><strong>Glosses:</strong> ${example.glosses}</p>
                <p><strong>Translation:</strong> ${example.translation}</p>
            `;
            resultsDiv.appendChild(exampleDiv);
        });
    }
});
