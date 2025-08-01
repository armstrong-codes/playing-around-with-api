document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const resultsHolder = document.querySelector('.results_cards_holder');
    const resultsContainer = document.querySelector('.results_container');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query !== '') {
            fetchMovies(query);
        }
        document.querySelector('.results_title').innerHTML = `Results for "${query}"`;
    });

    function fetchMovies(query) {
        const API_URL = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                displayMovies(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    function displayMovies(movies) {
        resultsHolder.innerHTML = '';
        if (movies.length === 0) {
            resultsHolder.innerHTML = '<p>No results found.</p>';
            return;
        }
        resultsContainer.style.display = 'flex';

        movies.forEach(item => {
            const show = item.show;
            const title = show.name || 'Untitled';
            const summary = show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No description available.';
            const genres = show.genres.length ? show.genres.join(', ') : 'N/A';

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card_title">
                    <h3>${title}</h3>
                    <i class="fa-solid fa-film"></i>
                </div>
                <div class="descript">
                    <p>${summary}</p>
                </div>
                <p class="genre">Genres: ${genres}</p>
                <button class="more_btn">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            `;
            resultsHolder.appendChild(card);
            document.querySelector('.ribbon').style.opacity = '1';
            document.querySelectorAll('.results_cards_holder .card').forEach(cardRes => {
                cardRes.style.visibility = 'visible';
                cardRes.style.opacity = '1';
            });
        });

        attachMoreButtonListeners(); // ✅ Add listeners after rendering cards
    }

    function attachMoreButtonListeners() {
        const morebuttons = document.querySelectorAll('.more_btn');
        morebuttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = button.closest('.card');
                if (card.classList.contains('extended')) {
                    card.classList.remove('extended');
                    button.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
                    button.classList.remove('active');
                } else {
                    card.classList.add('extended');
                    button.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
                    button.classList.add('active');
                    setTimeout(() => {
                        card.classList.remove('extended');
                        button.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
                        button.classList.remove('active');
                    }, 10000);
                }
            });
        });
    }

});
