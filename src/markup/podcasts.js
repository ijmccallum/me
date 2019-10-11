var podcasts = require('./podcasts.json');

module.exports = function(){

    let podcastsMarkup = '';
    podcasts.casts.forEach(function(podcast) {
        podcastsMarkup += html`
            <article>
                <header>
                    <h3><a href="${podcast.url}">${podcast.title}</a></h3>
                </header>
                <p>${podcast.description}</p>
            </article>
        `;
    });

    return html`
        <div class="margin-bottom grid">
            <div>
                <h2>Podcasts</h2>
                <p>This is my way of keeping up with the industry. Most are Front End Dev related, others are more general.</p>
            </div>
        </div>
        <div class="grid">
            ${podcastsMarkup}
        </div>
    `;
};
